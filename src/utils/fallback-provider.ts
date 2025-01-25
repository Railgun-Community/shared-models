import { FallbackProvider, Network } from 'ethers';
import { ConfiguredJsonRpcProvider } from './configured-json-rpc-provider';
import { FallbackProviderConfig } from 'ethers/lib.commonjs/providers/provider-fallback';

export type FallbackProviderJsonConfig = {
  chainId: number;
  providers: ProviderJson[];
};

export type ProviderJson = {
  priority: number;
  weight: number;
  provider: string;
  stallTimeout?: number;
  maxLogsPerBatch?: number;
};

export const createFallbackProviderFromJsonConfig = (
  config: FallbackProviderJsonConfig,
  pollingInterval?: number,
): FallbackProvider => {
  try {
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
      pollingInterval,
    });
  } catch (cause) {
    if (!(cause instanceof Error)) {
      throw new Error(
        'Non-error thrown from createFallbackProviderFromJsonConfig',
        { cause },
      );
    }
    throw new Error(
      `Invalid fallback provider config for chain ${config.chainId}`,
      { cause },
    );
  }
};
