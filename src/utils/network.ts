import { Network, NETWORK_CONFIG } from '../models/network-config';
import { Chain } from '../models/response-types';

export const networkForChain = (chain: Chain): Optional<Network> => {
  return Object.values(NETWORK_CONFIG).find(
    network =>
      network.chain.type === chain.type && network.chain.id === chain.id,
  );
};
