import { Chain } from './response-types';
import type { Optional } from '../types/global';

export type RailgunBalanceRefreshTrigger = (
  chain: Chain,
  railgunWalletIdFilter: Optional<string[]>,
) => Promise<void>;
