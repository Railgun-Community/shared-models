import { ChainType } from './response-types';

export type RelayerFeeMessageData = {
  fees: MapType<string>;
  feeExpiration: number;
  feesID: string;
  railgunAddress: string;
  identifier: Optional<string>;
  availableWallets: number;
  version: string;
  relayAdapt: string;
};

export type RelayerFeeMessage = {
  data: string; // hex-encoded FeeMessageData
  signature: string; // hex-encoded signature
};

type EncryptedData = [string, string];

export type RelayerMethodParamsTransact = {
  pubkey: string;
  encryptedData: EncryptedData;
};

export type RelayerRawParamsTransact = {
  serializedTransaction: string;
  chainID: number;
  chainType: ChainType;
  feesID: string;
  minGasPrice: string;
  relayerViewingKey: string;
  useRelayAdapt: boolean;
  devLog: boolean;
  minVersion: string;
  maxVersion: string;
};

export type CachedTokenFee = {
  feePerUnitGas: string;
  expiration: number;
  feesID: string;
  availableWallets: number;
  relayAdapt: string;
};

export type SelectedRelayer = {
  railgunAddress: string;
  tokenAddress: string;
  tokenFee: CachedTokenFee;
};

export enum RelayerConnectionStatus {
  Error = 'Error',
  Searching = 'Searching',
  Connected = 'Connected',
  Disconnected = 'Disconnected',
  AllUnavailable = 'AllUnavailable',
}
