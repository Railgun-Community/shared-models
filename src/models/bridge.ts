import { FeeTokenDetails } from './fee-token';
import { NetworkName } from './network-config';
import { ProofType } from './proof';
import { RelayerConnectionStatus } from './relayer';
import {
  Chain,
  RailgunERC20Amount,
  RailgunERC20AmountRecipient,
  RailgunNFTAmount,
  RailgunNFTAmountRecipient,
  TransactionGasDetailsSerialized,
} from './response-types';
import { TransactionReceiptLog } from './transaction';

export enum BridgeEvent {
  /* General */
  Message = 'message',
  Error = 'error',
  UncaughtException = 'uncaughtException',

  /* Quickstart */
  OnBalancesUpdate = 'onBalancesUpdate',
  OnHistoryScanUpdate = 'onMerkletreeScanCallback',
  OnProofProgress = 'onProofProgress',

  /* Relayer */
  OnRelayerStatusCallback = 'OnRelayerStatusCallback',
}

export enum BridgeCallEvent {
  MnemonicToPKey = 'mnemonicToPKeyEthers',
  CreateRailgunWallet = 'createRailgunWallet',
  CreateViewOnlyRailgunWallet = 'CreateViewOnlyRailgunWallet',
  LoadRailgunWalletByID = 'loadRailgunWalletByID',
  UnloadRailgunWalletByID = 'unloadRailgunWalletByID',
  StartRailgunEngine = 'startRailgunEngine',
  LoadProvider = 'loadProvider',
  DownloadInitialArtifacts = 'DownloadInitialArtifacts',
  GetRailgunAddress = 'getRailgunAddress',
  GetWalletShareableViewingKey = 'GetWalletShareableViewingKey',
  RefreshRailgunBalances = 'refreshRailgunBalances',
  GenerateTransferProof = 'generateTransferProof',
  GenerateUnshieldProof = 'generateUnshieldProof',
  GenerateUnshieldBaseTokenProof = 'generateUnshieldBaseTokenProof',
  ValidateCachedProvedTransaction = 'ValidateCachedProvedTransaction',
  PopulateShield = 'populateShield',
  PopulateProvedTransfer = 'populateProvedTransfer',
  PopulateProvedUnshield = 'populateProvedUnshield',
  PopulateShieldBaseToken = 'populateShieldBaseToken',
  PopulateProvedUnshieldBaseToken = 'populateProvedUnshieldBaseToken',
  GasEstimateForShield = 'gasEstimateForShield',
  GasEstimateForShieldBaseToken = 'gasEstimateForShieldBaseToken',
  GasEstimateForUnprovenTransfer = 'gasEstimateForUnprovenTransfer',
  GasEstimateForUnprovenUnshield = 'gasEstimateForUnprovenUnshield',
  GasEstimateForUnprovenUnshieldBaseToken = 'gasEstimateForUnprovenUnshieldBaseToken',
  GetRandomBytes = 'getRandomBytes',
  GetShieldPrivateKeySignatureMessage = 'GetShieldPrivateKeySignatureMessage',
  ValidateRailgunAddress = 'validateRailgunAddress',
  ValidateEthAddress = 'validateEthAddress',
  VerifyRelayerSignature = 'verifyRelayerSignature',
  EncryptDataWithSharedKey = 'encryptDataWithSharedKey',
  EncryptAESGCM256 = 'encryptAESGCM256',
  DecryptAESGCM256 = 'decryptAESGCM256',
  GetRailgunWalletAddressData = 'GetRailgunWalletAddressData',
  GetWalletMnemonic = 'GetWalletMnemonic',
  ScanUpdatesForMerkletreesAndWallets = 'ScanUpdatesForMerkletreesAndWallets',
  RescanFullMerkletreesAndWallets = 'RescanFullMerkletreesAndWallets',
  FullRescanBalancesAllWallets = 'FullRescanBalancesAllWallets',
  GetWalletTransactionHistory = 'GetWalletTransactionHistory',
  Pbkdf2 = 'Pbkdf2',
  PopulateCrossContractCalls = 'PopulateCrossContractCalls',
  GasEstimateForUnprovenCrossContractCalls = 'GasEstimateForUnprovenCrossContractCalls',
  GenerateCrossContractCallsProof = 'GenerateCrossContractCallsProof',
  GetRelayAdaptTransactionError = 'GetRelayAdaptTransactionError',
  GetCompletedTxidFromNullifiers = 'GetCompletedTxidFromNullifiers',
  RelayerStart = 'Relayer.Start',
  RelayerTryReconnect = 'Relayer.TryReconnect',
  RelayerSetAddressFilters = 'Relayer.SetAddressFilters',
  RelayerSetChain = 'Relayer.SetChain',
  RelayerFindBestRelayer = 'Relayer.FindBestRelayer',
  RelayerRelayTransaction = 'Relayer.RelayTransaction',
  RelayerSupportsERC20Token = 'Relayer.SupportsERC20Token',
}

export type StartRailgunEngineParams = {
  dbPath: string;
  devMode: boolean;
  walletSource: string;
  documentsDir: string;
};

export type RefreshRailgunBalancesParams = {
  chain: Chain;
  railWalletID: string;
  fullRescan: boolean;
};

export type MnemonicToPKeyParams = {
  mnemonic: string;
  derivationIndex?: number;
};

export type CreateRailgunWalletParams = {
  encryptionKey: string;
  mnemonic: string;
  creationBlockNumbers: Optional<MapType<number>>;
};

export type GetWalletMnemonicParams = {
  encryptionKey: string;
  railWalletID: string;
};

export type CreateViewOnlyRailgunWalletParams = {
  encryptionKey: string;
  shareableViewingKey: string;
  creationBlockNumbers: Optional<MapType<number>>;
};

export type GenerateTransferProofParams = {
  networkName: NetworkName;
  railWalletID: string;
  showSenderAddressToRecipient: boolean;
  memoText: Optional<string>;
  encryptionKey: string;
  erc20AmountRecipients: RailgunERC20AmountRecipient[];
  nftAmountRecipients: RailgunNFTAmountRecipient[];
  relayerFeeERC20AmountRecipient?: RailgunERC20AmountRecipient;
  sendWithPublicWallet: boolean;
  overallBatchMinGasPrice: Optional<string>;
};

export type DownloadInitialArtifactsParams = {
  preloadArtifactVariantStrings: string[];
  documentsDir: string;
};

export type GetWalletTransactionHistoryParams = {
  chain: Chain;
  railWalletID: string;
  startingBlock: Optional<number>;
};

export type GetRailgunAddressParams = {
  railWalletID: string;
};

export type UnloadRailgunWalletByIDParams = {
  railWalletID: string;
};

export type GetRandomBytesParams = {
  length: number;
};

export type GetCompletedTxidFromNullifiersParams = {
  chain: Chain;
  nullifiers: string[];
};

export type Pbkdf2Params = {
  secret: string;
  salt: string;
  iterations: number;
};

export type ScanUpdatesForMerkletreesAndWalletsParams = {
  chain: Chain;
};

export type RescanFullMerkletreesAndWalletsParams = {
  chain: Chain;
};

export type GetWalletShareableViewingKeyParams = {
  railWalletID: string;
};

export type EncryptDataWithSharedKeyParams = {
  data: object;
  externalPubKey: string;
};

export type DecryptAESGCM256Params = {
  encryptedData: [string, string];
  key: Uint8Array | string;
};

export type EncryptAESGCM256Params = {
  data: object;
  key: Uint8Array | string;
};

export type ValidateRailgunAddressParams = {
  address: string;
};

export type ValidateEthAddressParams = {
  address: string;
};

export type PopulateShieldParams = {
  networkName: NetworkName;
  shieldPrivateKey: string;
  erc20AmountRecipients: RailgunERC20AmountRecipient[];
  nftAmountRecipients: RailgunNFTAmountRecipient[];
  transactionGasDetailsSerialized: TransactionGasDetailsSerialized;
};

export type PopulateProvedTransferParams = {
  networkName: NetworkName;
  railWalletID: string;
  showSenderAddressToRecipient: boolean;
  memoText: Optional<string>;
  erc20AmountRecipients: RailgunERC20AmountRecipient[];
  nftAmountRecipients: RailgunNFTAmountRecipient[];
  relayerFeeERC20AmountRecipient?: RailgunERC20AmountRecipient;
  sendWithPublicWallet: boolean;
  overallBatchMinGasPrice: Optional<string>;
  transactionGasDetailsSerialized: TransactionGasDetailsSerialized;
};

export type PopulateProvedUnshieldParams = {
  networkName: NetworkName;
  railWalletID: string;
  erc20AmountRecipients: RailgunERC20AmountRecipient[];
  nftAmountRecipients: RailgunNFTAmountRecipient[];
  relayerFeeERC20AmountRecipient?: RailgunERC20AmountRecipient;
  transactionGasDetailsSerialized: TransactionGasDetailsSerialized;
  overallBatchMinGasPrice: Optional<string>;
  sendWithPublicWallet: boolean;
};

export type PopulateProvedUnshieldBaseTokenParams = {
  networkName: NetworkName;
  publicWalletAddress: string;
  railWalletID: string;
  wrappedTokenAmount: RailgunERC20Amount;
  relayerFeeERC20AmountRecipient?: RailgunERC20AmountRecipient;
  transactionGasDetailsSerialized: TransactionGasDetailsSerialized;
  overallBatchMinGasPrice: Optional<string>;
  sendWithPublicWallet: boolean;
};

export type PopulateShieldBaseTokenParams = {
  networkName: NetworkName;
  railgunAddress: string;
  shieldPrivateKey: string;
  wrappedTokenAmount: RailgunERC20Amount;
  transactionGasDetailsSerialized: TransactionGasDetailsSerialized;
};

export type GasEstimateForShieldParams = {
  networkName: NetworkName;
  shieldPrivateKey: string;
  fromWalletAddress: string;
  erc20AmountRecipients: RailgunERC20AmountRecipient[];
  nftAmountRecipients: RailgunNFTAmountRecipient[];
};

export type GasEstimateForShieldBaseTokenParams = {
  networkName: NetworkName;
  railgunAddress: string;
  shieldPrivateKey: string;
  fromWalletAddress: string;
  wrappedTokenAmount: RailgunERC20Amount;
};

export type GenerateUnshieldProofParams = {
  networkName: NetworkName;
  railWalletID: string;
  encryptionKey: string;
  erc20AmountRecipients: RailgunERC20AmountRecipient[];
  nftAmountRecipients: RailgunNFTAmountRecipient[];
  relayerFeeERC20AmountRecipient?: RailgunERC20AmountRecipient;
  sendWithPublicWallet: boolean;
  overallBatchMinGasPrice: Optional<string>;
};

export type GenerateUnshieldBaseTokenProofParams = {
  networkName: NetworkName;
  publicWalletAddress: string;
  railWalletID: string;
  encryptionKey: string;
  wrappedTokenAmount: RailgunERC20Amount;
  relayerFeeERC20AmountRecipient?: RailgunERC20AmountRecipient;
  sendWithPublicWallet: boolean;
  overallBatchMinGasPrice: Optional<string>;
};

export type ValidateCachedProvedTransactionParams = {
  networkName: NetworkName;
  proofType: ProofType;
  railWalletID: string;
  showSenderAddressToRecipient: boolean;
  memoText: Optional<string>;
  erc20AmountRecipients: RailgunERC20AmountRecipient[];
  nftAmountRecipients: RailgunNFTAmountRecipient[];
  relayAdaptUnshieldERC20Amounts: Optional<RailgunERC20Amount[]>;
  relayAdaptUnshieldNFTAmounts: Optional<RailgunNFTAmount[]>;
  relayAdaptShieldERC20Addresses: Optional<string[]>;
  relayAdaptShieldNFTs: Optional<RailgunNFTAmount[]>;
  crossContractCallsSerialized: Optional<string[]>;
  relayerFeeERC20AmountRecipient?: RailgunERC20AmountRecipient;
  sendWithPublicWallet: boolean;
  overallBatchMinGasPrice: Optional<string>;
};

export type GasEstimateForUnprovenTransferParams = {
  networkName: NetworkName;
  railWalletID: string;
  memoText: Optional<string>;
  encryptionKey: string;
  erc20AmountRecipients: RailgunERC20AmountRecipient[];
  nftAmountRecipients: RailgunNFTAmountRecipient[];
  originalGasDetailsSerialized: TransactionGasDetailsSerialized;
  feeTokenDetails: Optional<FeeTokenDetails>;
  sendWithPublicWallet: boolean;
};

export type GasEstimateForUnprovenUnshieldParams = {
  networkName: NetworkName;
  railWalletID: string;
  encryptionKey: string;
  erc20AmountRecipients: RailgunERC20AmountRecipient[];
  nftAmountRecipients: RailgunNFTAmountRecipient[];
  originalGasDetailsSerialized: TransactionGasDetailsSerialized;
  feeTokenDetails: Optional<FeeTokenDetails>;
  sendWithPublicWallet: boolean;
};

export type GasEstimateForUnprovenUnshieldBaseTokenParams = {
  networkName: NetworkName;
  publicWalletAddress: string;
  railWalletID: string;
  encryptionKey: string;
  wrappedTokenAmount: RailgunERC20Amount;
  originalGasDetailsSerialized: TransactionGasDetailsSerialized;
  feeTokenDetails: Optional<FeeTokenDetails>;
  sendWithPublicWallet: boolean;
};

export type GasEstimateForUnprovenCrossContractCallsParams = {
  networkName: NetworkName;
  railWalletID: string;
  encryptionKey: string;
  relayAdaptUnshieldERC20Amounts: RailgunERC20Amount[];
  relayAdaptUnshieldNFTAmounts: RailgunNFTAmount[];
  relayAdaptShieldERC20Addresses: string[];
  relayAdaptShieldNFTs: RailgunNFTAmount[];
  crossContractCallsSerialized: string[];
  originalGasDetailsSerialized: TransactionGasDetailsSerialized;
  feeTokenDetails: Optional<FeeTokenDetails>;
  sendWithPublicWallet: boolean;
};

export type PopulateCrossContractCallsParams = {
  networkName: NetworkName;
  railWalletID: string;
  relayAdaptUnshieldERC20Amounts: RailgunERC20Amount[];
  relayAdaptUnshieldNFTAmounts: RailgunNFTAmount[];
  relayAdaptShieldERC20Addresses: string[];
  relayAdaptShieldNFTs: RailgunNFTAmount[];
  crossContractCallsSerialized: string[];
  relayerFeeERC20AmountRecipient?: RailgunERC20AmountRecipient;
  sendWithPublicWallet: boolean;
  overallBatchMinGasPrice: Optional<string>;
  transactionGasDetailsSerialized: TransactionGasDetailsSerialized;
};

export type GenerateCrossContractCallsProofParams = {
  networkName: NetworkName;
  railWalletID: string;
  encryptionKey: string;
  relayAdaptUnshieldERC20Amounts: RailgunERC20Amount[];
  relayAdaptUnshieldNFTAmounts: RailgunNFTAmount[];
  relayAdaptShieldERC20Addresses: string[];
  relayAdaptShieldNFTs: RailgunNFTAmount[];
  crossContractCallsSerialized: string[];
  relayerFeeERC20AmountRecipient?: RailgunERC20AmountRecipient;
  sendWithPublicWallet: boolean;
  overallBatchMinGasPrice: Optional<string>;
};

export type GetRelayAdaptTransactionErrorParams = {
  receiptLogs: TransactionReceiptLog[];
};

export type LoadRailgunWalletByIDParams = {
  encryptionKey: string;
  railWalletID: string;
  isViewOnlyWallet: boolean;
};

export type GetRailgunWalletAddressDataParams = {
  railgunAddress: string;
};

export type LoadProviderParams = {
  providerJsonString: string;
  networkName: NetworkName;
  shouldDebug: boolean;
};

export type RelayerStatusCallbackData = {
  chain: Chain;
  status: RelayerConnectionStatus;
};

export type VerifyRelayerSignatureParams = {
  signature: string;
  data: string;
  signingKey: string;
};

export type RelayerActionData = {
  error?: string;
};

export type RelayerSendActionData = {
  txHash?: string;
  error?: string;
};

export type RelayerStartParams = {
  chain: Chain;
  wakuDirectPeers: string[];
};

export type RelayerSetAddressFiltersParams = {
  allowlist: Optional<string[]>;
  blocklist: Optional<string[]>;
};

export type RelayerSetChainParams = {
  chain: Chain;
};

export type RelayerFindBestRelayerParams = {
  chain: Chain;
  tokenAddress: string;
  useRelayAdapt: boolean;
};

export type RelayerRelayTransactionParams = {
  serializedTransaction: string;
  relayerRailgunAddress: string;
  relayerFeesID: string;
  chain: Chain;
  nullifiers: string[];
  overallBatchMinGasPrice: Optional<string>;
  useRelayAdapt: boolean;
};

export type RelayerSupportsERC20TokenParams = {
  chain: Chain;
  tokenAddress: string;
  useRelayAdapt: boolean;
};
