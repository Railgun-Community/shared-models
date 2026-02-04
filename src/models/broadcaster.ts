import { Authorization } from 'ethers';
import { TXIDVersion } from './engine';
import {
  ChainType,
  CommitmentCiphertextV2,
  CommitmentCiphertextV3,
  EVMGasType,
  PreTransactionPOIsPerTxidLeafPerList,
} from './response-types';
import type { MapType, Optional } from '../types/global';

export const MIN_BROADCASTER_RELIABILITY_SCORE = 0.75;

export type BroadcasterFeeMessageData = {
  fees: MapType<string>;
  feeExpiration: number;
  feesID: string;
  railgunAddress: string;
  identifier: Optional<string>;
  availableWallets: number;
  version: string;
  relayAdapt: string;
  requiredPOIListKeys: string[];
  reliability: number;
};

export type BroadcasterFeeMessage = {
  data: string; // hex-encoded FeeMessageData
  signature: string; // hex-encoded signature
};

type EncryptedData = [string, string];

export type BroadcasterEncryptedMethodParams = {
  pubkey: string;
  encryptedData: EncryptedData;
};

type BroadcasterRawParamsShared = {
  txidVersion: TXIDVersion;
  chainID: number;
  chainType: ChainType;
  feesID: string;
  broadcasterViewingKey: string;
  devLog: boolean;
  minVersion: string;
  maxVersion: string;
};

export type BroadcasterTransactRequestRaw = BroadcasterRawParamsShared & {
  to: string;
  data: string;
  useRelayAdapt: boolean;
  preTransactionPOIsPerTxidLeafPerList: PreTransactionPOIsPerTxidLeafPerList;
}

export enum BroadcasterTransactRequestType {
  COMMON = 'COMMON',
  TX7702 = 'TX7702',
}

export type BroadcasterRawParamsTransactCommon = BroadcasterTransactRequestRaw & {
  transactType: BroadcasterTransactRequestType.COMMON;
  minGasPrice: string;
};

export type BroadcasterRawParamsTransactEIP7702 = BroadcasterRawParamsShared & {
  transactType: BroadcasterTransactRequestType.TX7702;
  // Explicit ERC-1559 fee fields. These are REQUIRED for ERC-7702 (type 4).
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
  authorization: Authorization;
};

export type BroadcasterRawParamsTransact =
  | BroadcasterRawParamsTransactCommon
  | BroadcasterRawParamsTransactEIP7702;

export type BroadcasterRawParamsPreAuthorize = BroadcasterRawParamsShared & {
  gasLimit: string;
  commitmentCiphertext: CommitmentCiphertextV2 | CommitmentCiphertextV3;
  commitmentHash: string;
};

export type BroadcasterPreAuthorization = {
  gasLimit: string;
  commitmentHash: string;
  expiration: number;
};

export type BroadcasterSignedPreAuthorization = BroadcasterPreAuthorization & {
  signature: string;
};

export type CachedTokenFee = {
  feePerUnitGas: string;
  expiration: number;
  feesID: string;
  availableWallets: number;
  relayAdapt: string;
  reliability: number;
};

export type SelectedBroadcaster = {
  railgunAddress: string;
  tokenAddress: string;
  tokenFee: CachedTokenFee;
};

export enum BroadcasterConnectionStatus {
  Error = 'Error',
  Searching = 'Searching',
  Connected = 'Connected',
  Disconnected = 'Disconnected',
  AllUnavailable = 'AllUnavailable',
}
