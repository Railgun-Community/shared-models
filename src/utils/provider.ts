import { FallbackProvider, JsonRpcProvider, Network, Provider, WebSocketProvider } from 'ethers';
import { ConfiguredJsonRpcProvider } from './configured-json-rpc-provider';
import { FallbackProviderConfig } from 'ethers/lib.commonjs/providers/provider-fallback';
import { isDefined } from './util';

export type FallbackProviderJsonConfig = {
  chainId: number;
  providers: ProviderJson[];
};

export type ProviderJson = {
  priority: number;
  weight: number;
  provider: string;
  chainId?: number;
  stallTimeout?: number;
  maxLogsPerBatch?: number;
};

export const createProviderFromJsonConfig = (
  config: FallbackProviderJsonConfig | ProviderJson,
  pollingInterval?: number,
): Provider => {
  try {
    // Handle single provider case
    if (!('providers' in config)) {
      // Get RPC URL
      const providerURL = config.provider;
      // Ensure providerURL exists and is a string
      if (!isDefined(providerURL)) {
        throw new Error('provider is required for single provider configuration');
      } else if (typeof providerURL !== 'string') {
        throw new Error('provider must be a string');
      }

      // Ensure chainId is present
      if (!isDefined(config.chainId)) {
        throw new Error('chainId is required for single provider configuration');
      }
      
      // Create singular provider depending on the URL
      let provider: JsonRpcProvider | WebSocketProvider;
      if (providerURL.startsWith('wss')) {
        provider = new WebSocketProvider(providerURL, config.chainId, {
          staticNetwork: true,
        });
      } else {
        provider = new JsonRpcProvider(providerURL, config.chainId, {
          staticNetwork: true,
          pollingInterval,
        });
      }

      return provider;
    };

    const totalWeight = config.providers.reduce(
      (acc, { weight }) => acc + weight,
      0,
    );
    if (totalWeight < 2) {
      throw new Error(
        'Total weight across providers must be >= 2 for fallback quorum.',
      );
    }

    const network = Network.from(Number(config.chainId));

    const providers: FallbackProviderConfig[] = config.providers.map(
      ({
        provider: providerURL,
        priority,
        weight,
        stallTimeout,
        maxLogsPerBatch,
      }) => {
        const isWebsocket = providerURL.startsWith('wss');
        if (isWebsocket) {
          throw new Error(
            'WebSocketProvider not supported in FallbackProvider as it will use polling instead of eth_subscribe',  
          );
        }

        const provider = new ConfiguredJsonRpcProvider(
          providerURL,
          network,
          maxLogsPerBatch,
        );

        const fallbackProviderConfig: FallbackProviderConfig = {
          provider,
          priority,
          weight,
          stallTimeout,
        };
        return fallbackProviderConfig;
      },
    );

    return new FallbackProvider(providers, network, {
      pollingInterval
    });
  } catch (cause) {
    if (!(cause instanceof Error)) {
      throw new Error(
        'Non-error thrown from createFallbackProviderFromJsonConfig',
        { cause },
      );
    }
    // Preserve the original error message
    throw cause;
  }
};
