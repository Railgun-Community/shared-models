import { Chain } from '../models/response-types';

export const compareChains = (chainA: Chain, chainB: Chain) => {
  return chainA.type === chainB.type && chainA.id === chainB.id;
};
