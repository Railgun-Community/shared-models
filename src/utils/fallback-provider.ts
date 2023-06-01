import { FallbackProvider, WebSocketProvider } from 'ethers';
import { PollingJsonRpcProvider } from './polling-json-rpc-provider';

export type FallbackProviderJsonConfig = {
  chainId: number;
  providers: ProviderJson[];
};

export type ProviderJson = {
  priority: number;
  weight: number;
  provider: string;
};

export const createFallbackProviderFromJsonConfig = (
  config: FallbackProviderJsonConfig,
): FallbackProvider => {
  try {
    const providers = config.providers.map(json => {
      const isWebsocket = json.provider.startsWith('wss');
      const provider = isWebsocket
        ? new WebSocketProvider(json.provider, Number(config.chainId))
        : new PollingJsonRpcProvider(json.provider, Number(config.chainId));
      return {
        ...json,
        provider,
      };
    });

    const quorum = 1;
    return new FallbackProvider(providers, quorum);
  } catch (err) {
    if (!(err instanceof Error)) {
      throw err;
    }
    throw new Error(`Invalid fallback provider config: ${err.message}`);
  }
};
