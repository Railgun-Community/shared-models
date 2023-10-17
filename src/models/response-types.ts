/// <reference types="../types/global" />
import { ContractTransaction } from 'ethers';
import { MerkletreeScanStatus } from './merkletree-scan';
import { FeesSerialized } from './network-config';
import { TXIDVersion } from './engine';
import { RailgunWalletBalanceBucket } from './balance';

export type RailgunAPICiphertext = {
  iv: string;
  data: string[];
};

/**
 * Type0 / Type1 = non-EIP-1559 (gasPrice).
 * Type2 = EIP-1559 (maxFeePerGas and maxPriorityFeePerGas).
 */
export enum EVMGasType {
  Type0 = 0,
  Type1 = 1,
  Type2 = 2,
}

export type TransactionGasDetails =
  | TransactionGasDetailsType0
  | TransactionGasDetailsType1
  | TransactionGasDetailsType2;

export type TransactionGasDetailsType0 = {
  evmGasType: EVMGasType.Type0;
  gasEstimate: bigint;
  gasPrice: bigint;
};

export type TransactionGasDetailsType1 = {
  evmGasType: EVMGasType.Type1;
  gasEstimate: bigint;
  gasPrice: bigint;
};

export type TransactionGasDetailsType2 = {
  evmGasType: EVMGasType.Type2;
  gasEstimate: bigint;
  maxFeePerGas: bigint;
  maxPriorityFeePerGas: bigint;
};

export type FeeTokenDetails = {
  tokenAddress: string;
  feePerUnitGas: bigint;
};

export enum ChainType {
  EVM = 0,
}

export type Chain = {
  type: ChainType;
  id: number;
};

export type RailgunBalancesEvent = {
  txidVersion: TXIDVersion;
  chain: Chain;
  railgunWalletID: string;
  balanceBucket: RailgunWalletBalanceBucket;
  erc20Amounts: RailgunERC20Amount[];
  nftAmounts: RailgunNFTAmount[];
};

export enum POIProofEventStatus {
  LoadingNextBatch = 'LoadingNextBatch',
  InProgress = 'InProgress',
  Error = 'Error',
  AllProofsCompleted = 'AllProofsCompleted',
}

export type POIProofProgressEvent = {
  status: POIProofEventStatus;
  txidVersion: TXIDVersion;
  chain: Chain;
  railgunWalletID: string;
  progress: number;
  listKey: string;
  txid: string;
  railgunTxid: string;
  index: number;
  totalCount: number;
  errMessage: Optional<string>;
};

export type MerkletreeScanUpdateEvent = {
  chain: Chain;
  scanStatus: MerkletreeScanStatus;
  progress: number;
};

export type LoadProviderResponse = {
  feesSerialized: FeesSerialized;
};

export type RailgunWalletInfo = {
  id: string;
  railgunAddress: string;
};

export type RailgunWalletAddressData = {
  masterPublicKey: bigint;
  viewingPublicKey: bigint;
};

export type RailgunTxidFromNullifiersResponse = {
  txid?: string;
};

export type Proof = {
  pi_a: [string, string];
  pi_b: [[string, string], [string, string]];
  pi_c: [string, string];
};

export type PreTransactionPOI = {
  snarkProof: Proof;
  txidMerkleroot: string;
  poiMerkleroots: string[];
  blindedCommitmentsOut: string[];
  railgunTxidIfHasUnshield: string;
};

export type PreTransactionPOIsPerTxidLeafPerList = Record<
  string, // listKey
  Record<
    string, // txidLeafHash
    PreTransactionPOI
  >
>;

export type RailgunPopulateTransactionResponse = {
  transaction: ContractTransaction;
  nullifiers?: string[];
  preTransactionPOIsPerTxidLeafPerList: PreTransactionPOIsPerTxidLeafPerList;
};

export type RailgunTransactionGasEstimateResponse = {
  gasEstimate: bigint;
  relayerFeeCommitment?: CommitmentSummary;
};

export type RailgunERC20Recipient = {
  tokenAddress: string;
  recipientAddress: string;
};

export type RailgunERC20Amount = {
  tokenAddress: string;
  amount: bigint;
};

export type RailgunERC20AmountRecipient = RailgunERC20Amount & {
  recipientAddress: string;
};

/**
 * Synced NFT types from TokenType (@railgun-community/engine).
 */
export enum NFTTokenType {
  ERC721 = 1,
  ERC1155 = 2,
}

export type NFTAmount = {
  nftAddress: string;
  nftTokenType: NFTTokenType;
  tokenSubID: string;
  amountString: string;
};

export type NFTAmountRecipient = NFTAmount & {
  recipientAddress: string;
};

export type RailgunNFTAmount = {
  nftAddress: string;
  nftTokenType: NFTTokenType;
  tokenSubID: string;
  amount: bigint;
};

export type RailgunNFTAmountRecipient = RailgunNFTAmount & {
  recipientAddress: string;
};

export type EncryptDataWithSharedKeyResponse = {
  encryptedData: [string, string];
  randomPubKey: string;
  sharedKey: Uint8Array;
};

export type EncryptDataWithSharedKeySerialized = {
  encryptedData: [string, string];
  randomPubKey: string;
  sharedKey: string;
};

export type Pbkdf2Response = string;

type SendAdditionalData = {
  recipientAddress: Optional<string>;
  walletSource: Optional<string>;
  memoText: Optional<string>;
  hasValidPOIForActiveLists: boolean;
};

type HistoryAdditionalData = {
  hasValidPOIForActiveLists: boolean;
};

export type RailgunHistoryERC20Amount = RailgunERC20Amount &
  HistoryAdditionalData;

export type RailgunHistoryNFTAmount = RailgunNFTAmount & HistoryAdditionalData;

export type RailgunHistorySendERC20Amount = RailgunHistoryERC20Amount &
  SendAdditionalData;

export type RailgunHistorySendNFTAmount = RailgunHistoryNFTAmount &
  SendAdditionalData;

type UnshieldAdditonalData = {
  unshieldFee: Optional<string>;
  hasValidPOIForActiveLists: boolean;
};

export type RailgunHistoryUnshieldERC20Amount = RailgunHistorySendERC20Amount &
  UnshieldAdditonalData;

export type RailgunHistoryUnshieldNFTAmount = RailgunHistorySendNFTAmount &
  UnshieldAdditonalData;

type ReceiveAdditionalData = {
  senderAddress: Optional<string>;
  memoText: Optional<string>;
  shieldFee: Optional<string>;
  hasValidPOIForActiveLists: boolean;
  balanceBucket: RailgunWalletBalanceBucket;
};

export type RailgunHistoryReceiveERC20Amount = RailgunHistoryERC20Amount &
  ReceiveAdditionalData;

export type RailgunHistoryReceiveNFTAmount = RailgunHistoryNFTAmount &
  ReceiveAdditionalData;

export enum TransactionHistoryItemCategory {
  ShieldERC20s = 'ShieldERC20s',
  UnshieldERC20s = 'UnshieldERC20s',
  TransferSendERC20s = 'TransferSendERC20s',
  TransferReceiveERC20s = 'TransferReceiveERC20s',
  Unknown = 'Unknown',
}

export type TransactionHistoryItem = {
  txid: string;
  version: number;
  timestamp: Optional<number>;
  blockNumber: Optional<number>;
  receiveERC20Amounts: RailgunHistoryReceiveERC20Amount[];
  transferERC20Amounts: RailgunHistorySendERC20Amount[];
  changeERC20Amounts: RailgunHistoryERC20Amount[];
  relayerFeeERC20Amount?: RailgunHistoryERC20Amount;
  unshieldERC20Amounts: RailgunHistoryUnshieldERC20Amount[];
  receiveNFTAmounts: RailgunHistoryReceiveNFTAmount[];
  transferNFTAmounts: RailgunHistorySendNFTAmount[];
  unshieldNFTAmounts: RailgunHistoryUnshieldNFTAmount[];
  category: TransactionHistoryItemCategory;
};

type Ciphertext = {
  iv: string;
  tag: string;
  data: string[];
};

export type CommitmentCiphertext = {
  ciphertext: Ciphertext;
  blindedSenderViewingKey: string;
  blindedReceiverViewingKey: string;
  annotationData: string;
  memo: string;
};

export type CommitmentSummary = {
  commitmentCiphertext: CommitmentCiphertext;
  commitmentHash: string;
};
