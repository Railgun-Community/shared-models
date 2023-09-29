import { TXIDVersion } from './engine';
import { Chain } from './response-types';

export type RailgunBalanceRefreshTrigger = (
  txidVersion: TXIDVersion,
  chain: Chain,
  railgunWalletID: string,
  fullRescan: boolean,
) => Promise<void>;
