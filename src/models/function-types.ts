import { Chain } from './response-types';

export type RailgunBalanceRefreshTrigger = (chain: Chain) => Promise<void>;
