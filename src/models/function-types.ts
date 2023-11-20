import { Chain } from './response-types';

export type RailgunBalanceRefreshTrigger = (
  chain: Chain,
  railgunWalletIdFilter: Optional<string[]>,
) => Promise<void>;
