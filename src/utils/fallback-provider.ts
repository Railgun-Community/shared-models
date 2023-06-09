import { FallbackProvider, Network, WebSocketProvider } from 'ethers';
import { PollingJsonRpcProvider } from './polling-json-rpc-provider';
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
  disableBatching?: boolean;
};

export const createFallbackProviderFromJsonConfig = (
  config: FallbackProviderJsonConfig,
): FallbackProvider => {
  try {
    const network = Network.from(Number(config.chainId));

    const providers: FallbackProviderConfig[] = config.providers.map(
      ({
        provider: providerURL,
        priority,
        weight,
        stallTimeout,
        disableBatching,
      }) => {
        const isWebsocket = providerURL.startsWith('wss');
        const provider = isWebsocket
          ? new WebSocketProvider(providerURL, network)
          : new PollingJsonRpcProvider(providerURL, network, disableBatching);

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
    throw new Error(`Invalid fallback provider config: ${err.message}`);
  }
};
