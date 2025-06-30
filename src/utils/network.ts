import { Network, NETWORK_CONFIG, NetworkName } from '../models/network-config';
import { Chain } from '../models/response-types';
import type { Optional } from '../types/global';

export const networkForChain = (chain: Chain): Optional<Network> => {
  return Object.values(NETWORK_CONFIG).find(
    network =>
      network.chain.type === chain.type && network.chain.id === chain.id,
  );
};

export const isHistoricalRelayAdaptContractAddress = (
  networkName: NetworkName,
  address: string,
) => {
  const network = NETWORK_CONFIG[networkName];
  return (
    network.relayAdaptHistory.find(historicalAddress => {
      return historicalAddress.toLowerCase() === address.toLowerCase();
    }) != null
  );
};
