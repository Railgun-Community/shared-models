import { JsonRpcProvider, JsonRpcApiProviderOptions, Network } from 'ethers';

export class ConfiguredJsonRpcProvider extends JsonRpcProvider {
  constructor(url: string, network: Network, maxLogsPerBatch = 100) {
    const options: JsonRpcApiProviderOptions = {
      staticNetwork: network,
      batchMaxCount: maxLogsPerBatch,
    };
    super(url, network, options);
  }
}
