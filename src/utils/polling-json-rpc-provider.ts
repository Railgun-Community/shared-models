import { JsonRpcProvider, JsonRpcApiProviderOptions, Network } from 'ethers';

/**
 * Uses a setting in JsonRpcProvider to poll for events,
 * rather than using sparsely-implemented eth_filter events.
 */
export class PollingJsonRpcProvider extends JsonRpcProvider {
  constructor(url: string, network: Network, disableBatching = false) {
    const options: JsonRpcApiProviderOptions = {
      polling: true,
      staticNetwork: network,
    };
    if (disableBatching) {
      options.batchMaxCount = 1;
    }
    super(url, network, options);
    this.pollingInterval = 30000;
  }
}
