import {
  FallbackProvider,
  StaticJsonRpcProvider,
  WebSocketProvider,
} from '@ethersproject/providers';

export type FallbackProviderJsonConfig = {
  chainId: number;
  providers: ProviderJson[];
};

export type ProviderJson = {
  priority: number;
  weight: number;
  provider: string;
};

type ProviderDebug = {
  action: string;
  rid: number;
  backend: {
    weight: number;
    start: number;
    duration: number;
    result?: string[];
    error?: typeof Error;
    provider?: StaticJsonRpcProvider;
  };
  request: { method: string; params: { filter?: object } };
  provider: FallbackProvider;
};

export const createFallbackProviderFromJsonConfig = (
  config: FallbackProviderJsonConfig,
  debugMessage?: (msg: string) => void,
): FallbackProvider => {
  const providers = config.providers.map(json => {
    const isWebsocket = json.provider.startsWith('wss');
    const provider = isWebsocket
      ? new WebSocketProvider(json.provider, Number(config.chainId))
      : new StaticJsonRpcProvider(json.provider, Number(config.chainId));

    if (debugMessage) {
      provider.on('debug', (debug: ProviderDebug) => {
        if (debug.backend && debug.backend.error) {
          debugMessage(`Provider error: ${debug.backend.error}`);
          debugMessage(
            `Provider connection: ${
              debug.backend.provider
                ? debug.backend.provider.connection
                : undefined
            }`,
          );
        }
      });
    }

    return {
      ...json,
      provider,
    };
  });

  const quorum = 1;
  return new FallbackProvider(providers, quorum);
};
