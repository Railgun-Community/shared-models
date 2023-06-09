import { JsonRpcProvider, JsonRpcApiProviderOptions, Networkish } from 'ethers';

/**
 * Uses a setting in JsonRpcProvider to poll for events,
 * rather than using sparsely-implemented eth_filter events.
 */
export class PollingJsonRpcProvider extends JsonRpcProvider {
  constructor(url: string, network: Networkish, disableBatching = false) {
    const options: JsonRpcApiProviderOptions = { polling: true };
    if (disableBatching) {
      options.batchMaxCount = 1;
    }
    super(url, network, options);
  }
}
