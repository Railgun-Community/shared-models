import { JsonRpcProvider, JsonRpcApiProviderOptions, Network } from 'ethers';

export class ConfiguredJsonRpcProvider extends JsonRpcProvider {
  constructor(url: string, network: Network, disableBatching = false) {
    const options: JsonRpcApiProviderOptions = {
      staticNetwork: network,
    };
    if (disableBatching) {
      options.batchMaxCount = 1;
    }
    super(url, network, options);
  }
}
