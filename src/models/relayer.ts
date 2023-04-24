import { ChainType, CommitmentCiphertext } from './response-types';

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

export type RelayerEncryptedMethodParams = {
  pubkey: string;
  encryptedData: EncryptedData;
};

type RelayerRawParamsShared = {
  chainID: number;
  chainType: ChainType;
  feesID: string;
  relayerViewingKey: string;
  devLog: boolean;
  minVersion: string;
  maxVersion: string;
};

export type RelayerRawParamsTransact = RelayerRawParamsShared & {
  serializedTransaction: string;
  minGasPrice: string;
  useRelayAdapt: boolean;
};

export type RelayerRawParamsPreAuthorize = RelayerRawParamsShared & {
  gasLimit: string;
  commitmentCiphertext: CommitmentCiphertext;
  commitmentHash: string;
};

export type RelayerPreAuthorization = {
  gasLimit: string;
  commitmentHash: string;
  expiration: number;
};

export type RelayerSignedPreAuthorization = RelayerPreAuthorization & {
  signature: string;
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
