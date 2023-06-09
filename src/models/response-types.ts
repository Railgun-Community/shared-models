/// <reference types="../types/global" />
import { ContractTransaction } from 'ethers';
import { MerkletreeScanStatus } from './merkletree-scan';
import { FeesSerialized } from './network-config';

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
  chain: Chain;
  erc20Amounts: RailgunERC20Amount[];
  nftAmounts: RailgunNFTAmount[];
  railgunWalletID: string;
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

export type RailgunPopulateTransactionResponse = {
  transaction: ContractTransaction;
  nullifiers?: string[];
};

export type RailgunTransactionGasEstimateResponse = {
  gasEstimate: bigint;
  relayerFeeCommitment?: CommitmentSummary;
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
};

export type RailgunSendERC20Amount = RailgunERC20Amount & SendAdditionalData;

export type RailgunSendNFTAmount = RailgunNFTAmount & SendAdditionalData;

type UnshieldAdditonalData = {
  unshieldFee: Optional<string>;
};

export type RailgunUnshieldERC20Amount = RailgunSendERC20Amount &
  UnshieldAdditonalData;

export type RailgunUnshieldNFTAmount = RailgunSendNFTAmount &
  UnshieldAdditonalData;

type ReceiveAdditionalData = {
  senderAddress: Optional<string>;
  memoText: Optional<string>;
  shieldFee: Optional<string>;
};

export type RailgunReceiveERC20Amount = RailgunERC20Amount &
  ReceiveAdditionalData;

export type RailgunReceiveNFTAmount = RailgunNFTAmount & ReceiveAdditionalData;

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
  receiveERC20Amounts: RailgunReceiveERC20Amount[];
  transferERC20Amounts: RailgunSendERC20Amount[];
  changeERC20Amounts: RailgunERC20Amount[];
  relayerFeeERC20Amount?: RailgunERC20Amount;
  unshieldERC20Amounts: RailgunUnshieldERC20Amount[];
  receiveNFTAmounts: RailgunReceiveNFTAmount[];
  transferNFTAmounts: RailgunSendNFTAmount[];
  unshieldNFTAmounts: RailgunUnshieldNFTAmount[];
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
