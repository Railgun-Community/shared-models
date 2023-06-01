import { FallbackProvider, Networkish, WebSocketProvider } from 'ethers';
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
  const network: Networkish = Number(config.chainId);
  try {
    const providers = config.providers.map(json => {
      const isWebsocket = json.provider.startsWith('wss');
      const provider = isWebsocket
        ? new WebSocketProvider(json.provider, network)
        : new PollingJsonRpcProvider(json.provider, network);
      return {
        ...json,
        provider,
      };
    });
    return new FallbackProvider(providers, network);
  } catch (err) {
    if (!(err instanceof Error)) {
      throw err;
    }
    throw new Error(`Invalid fallback provider config: ${err.message}`);
  }
};
