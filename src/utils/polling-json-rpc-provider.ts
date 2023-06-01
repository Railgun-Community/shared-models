import { JsonRpcProvider, Networkish } from 'ethers';

/**
 * Uses a setting in JsonRpcProvider to poll for events,
 * rather than using sparsely-implemented eth_filter events.
 */
export class PollingJsonRpcProvider extends JsonRpcProvider {
  constructor(url: string, network: Networkish) {
    super(url, network, { polling: true });
  }
}
