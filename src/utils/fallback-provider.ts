import { FallbackProvider, Network, WebSocketProvider } from 'ethers';
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
        const provider = isWebsocket
          ? new WebSocketProvider(providerURL, network)
          : new ConfiguredJsonRpcProvider(
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

    return new FallbackProvider(providers, network);
  } catch (err) {
    if (!(err instanceof Error)) {
      throw err;
    }
    throw new Error(
      `Invalid fallback provider config for chain ${config.chainId}: ${err.message}`,
    );
  }
};
