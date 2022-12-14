import { ChainType } from './response-types';

export type RelayerFeeMessageData = {
  fees: MapType<string>;
  feeExpiration: number;
  feesID: string;
  railgunAddress: string;
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
