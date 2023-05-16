import { Chain } from './response-types';

export type RailgunBalanceRefreshTrigger = (
  chain: Chain,
  railgunWalletID: string,
  fullRescan: boolean,
) => Promise<void>;
