import { BigNumber } from '@ethersproject/bignumber';
import { MerkletreeScanStatus } from './merkletree-scan';
import { EVMGasType, FeesSerialized } from './network-config';

export type RailgunAPICiphertext = {
  iv: string;
  data: string[];
};

export type TransactionGasDetails =
  | TransactionGasDetailsType0
  | TransactionGasDetailsType1
  | TransactionGasDetailsType2;

export type TransactionGasDetailsType0 = {
  evmGasType: EVMGasType.Type0;
  gasEstimate: BigNumber;
  gasPrice: BigNumber;
};

export type TransactionGasDetailsType1 = {
  evmGasType: EVMGasType.Type1;
  gasEstimate: BigNumber;
  gasPrice: BigNumber;
};

export type TransactionGasDetailsType2 = {
  evmGasType: EVMGasType.Type2;
  gasEstimate: BigNumber;
  maxFeePerGas: BigNumber;
  maxPriorityFeePerGas: BigNumber;
};

export type TransactionGasDetailsSerialized =
  | TransactionGasDetailsSerializedType0
  | TransactionGasDetailsSerializedType1
  | TransactionGasDetailsSerializedType2;

export type TransactionGasDetailsSerializedType0 = {
  evmGasType: EVMGasType.Type0;
  gasEstimateString: string;
  gasPriceString: string;
};

export type TransactionGasDetailsSerializedType1 = {
  evmGasType: EVMGasType.Type1;
  gasEstimateString: string;
  gasPriceString: string;
};

export type TransactionGasDetailsSerializedType2 = {
  evmGasType: EVMGasType.Type2;
  gasEstimateString: string;
  maxFeePerGasString: string;
  maxPriorityFeePerGasString: string;
};

export type StartRailgunEngineResponse = {
  error?: string;
};

export type DownloadInitialArtifactsResponse = {
  error?: string;
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
  feesSerialized?: FeesSerialized;
  error?: string;
};

export type RailgunWalletInfo = {
  id: string;
  railgunAddress: string;
};

export type LoadRailgunWalletResponse = {
  railgunWalletInfo?: RailgunWalletInfo;
  error?: string;
};

export type UnloadRailgunWalletResponse = {
  error?: string;
};

export type RailgunWalletAddressDataSerialized = {
  masterPublicKey: string;
  viewingPublicKey: string;
};

export type RailgunBalanceResponse = {
  error?: string;
};

export type RailgunProveTransactionResponse = {
  error?: string;
};

export type RailgunPopulateTransactionResponse = {
  serializedTransaction?: string;
  nullifiers?: string[];
  error?: string;
};

export type RailgunTransactionGasEstimateResponse = {
  gasEstimateString?: string;
  error?: string;
};

export type RailgunERC20Amount = {
  tokenAddress: string;
  amountString: string;
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

export type RailgunNFTAmount = {
  nftAddress: string;
  nftTokenType: NFTTokenType;
  tokenSubID: string;
  amountString: string;
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

export type ValidateCachedProvedTransactionResponse = {
  isValid: boolean;
  error?: string;
};

export type Pbkdf2Response = string;

type SendAdditionalData = {
  recipientAddress?: string;
  walletSource?: string;
  memoText?: string;
};

export type RailgunSendERC20Amount = RailgunERC20Amount & SendAdditionalData;

export type RailgunSendNFTAmount = RailgunNFTAmount & SendAdditionalData;

type ReceiveAdditionalData = {
  senderAddress?: string;
  memoText?: string;
};

export type RailgunReceiveERC20Amount = RailgunERC20Amount &
  ReceiveAdditionalData;

export type RailgunReceiveNFTAmount = RailgunNFTAmount & ReceiveAdditionalData;

export type TransactionHistoryItem = {
  txid: string;
  receiveERC20Amounts: RailgunReceiveERC20Amount[];
  transferERC20Amounts: RailgunSendERC20Amount[];
  changeERC20Amounts: RailgunERC20Amount[];
  relayerFeeERC20Amount?: RailgunERC20Amount;
  unshieldERC20Amounts: RailgunSendERC20Amount[];
  receiveNFTAmounts: RailgunReceiveNFTAmount[];
  transferNFTAmounts: RailgunSendNFTAmount[];
  unshieldNFTAmounts: RailgunSendNFTAmount[];
  version: number;
};

export type TransactionHistorySerializedResponse = {
  items?: TransactionHistoryItem[];
  error?: string;
};
