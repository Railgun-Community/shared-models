import { TXIDVersion } from './engine';
import { NetworkName } from './network-config';
import { PreTransactionPOIsPerTxidLeafPerList } from './response-types';

// TODO: Migrate to using Chain object directly when PPOI API update is permissioned
export type ChainParams = {
  chainType: string;
  chainID: string;
  txidVersion: TXIDVersion;
};

export type TransactProofData = {
  snarkProof: SnarkProof;
  poiMerkleroots: string[];
  txidMerkleroot: string;
  txidMerklerootIndex: number;
  blindedCommitmentsOut: string[];
  railgunTxidIfHasUnshield: string;
};

export type SnarkProof = {
  pi_a: [string, string];
  pi_b: [[string, string], [string, string]];
  pi_c: [string, string];
};

export type MerkleProof = {
  leaf: string; // hash of commitment
  elements: string[];
  indices: string;
  root: string;
};

export type ShieldQueueStatus = {
  unknown: number;
  pending: number;
  allowed: number;
  blocked: number;
  addedPOI: number;
  latestShield: Optional<string>;
};

export enum POIEventType {
  Shield = 'Shield',
  Transact = 'Transact',
  Unshield = 'Unshield',
  LegacyTransact = 'LegacyTransact',
}

export type POIEventLengths = Record<POIEventType, number>;

export type POIListStatus = {
  poiEventLengths: POIEventLengths;
  listProviderPOIEventQueueLength: Optional<number>;
  pendingTransactProofs: number;
  blockedShields: number;
  historicalMerklerootsLength: number;
  latestHistoricalMerkleroot: string;
};

export type GetTransactProofsParams = ChainParams & {
  bloomFilterSerialized: string;
  listKey: string;
};

export type GetBlockedShieldsParams = ChainParams & {
  bloomFilterSerialized: string;
  listKey: string;
};

export type LegacyTransactProofData = {
  txidIndex: string;
  npk: string;
  value: string;
  tokenHash: string;
  blindedCommitment: string;
};

export type SingleCommitmentProofsData = {
  commitment: string;
  npk: string;
  utxoTreeIn: number;
  utxoTreeOut: number;
  utxoPositionOut: number;
  railgunTxid: string;
  pois: PreTransactionPOIsPerTxidLeafPerList;
};

export type SubmitTransactProofParams = ChainParams & {
  listKey: string;
  transactProofData: TransactProofData;
};

export type SubmitLegacyTransactProofParams = ChainParams & {
  listKeys: string[];
  legacyTransactProofDatas: LegacyTransactProofData[];
};

export type SubmitSingleCommitmentProofsParams = ChainParams & {
  singleCommitmentProofsData: SingleCommitmentProofsData;
};

export enum BlindedCommitmentType {
  Shield = 'Shield',
  Transact = 'Transact',
  Unshield = 'Unshield',
}

export type ValidatePOIMerklerootsParams = ChainParams & {
  listKey: string;
  poiMerkleroots: string[];
};

export type BlindedCommitmentData = {
  blindedCommitment: string;
  type: BlindedCommitmentType;
};

export type GetPOIsPerListParams = ChainParams & {
  listKeys: string[];
  blindedCommitmentDatas: BlindedCommitmentData[];
};

export type GetMerkleProofsParams = ChainParams & {
  listKey: string;
  blindedCommitments: string[];
};

export type ValidateTxidMerklerootParams = ChainParams & {
  tree: number;
  index: number;
  merkleroot: string;
};

export type GetLatestValidatedRailgunTxidParams = ChainParams;

export enum POIStatus {
  // POI valdated in event list
  Valid = 'Valid',
  // Shield blocked
  ShieldBlocked = 'ShieldBlocked',
  // Transact/Unshield proof submitted, but not validated yet
  ProofSubmitted = 'ProofSubmitted',
  // Missing internal/external transact/unshield proof, or ShieldPending
  Missing = 'Missing',
}

export type POIsPerList = {
  [listKey: string]: POIStatus;
};

export type POIsPerListMap = {
  [blindedCommitment: string]: POIsPerList;
};

export type TxidMerkletreeSyncStatus = {
  currentTxidIndex: number;
  currentMerkleroot: string;
  validatedTxidIndex: number;
  validatedMerkleroot: string;
};

export type RailgunTxidStatus = {
  currentTxidIndex: Optional<number>;
  currentMerkleroot: Optional<string>;
  validatedTxidIndex: Optional<number>;
  validatedMerkleroot: Optional<string>;
};

export type ValidatedRailgunTxidStatus = {
  validatedTxidIndex: Optional<number>;
  validatedMerkleroot: Optional<string>;
};

export type NodeStatusAllNetworks = {
  listKeys: string[];
  forNetwork: Partial<Record<NetworkName, NodeStatusForNetwork>>;
};

export type NodeStatusForNetwork = {
  txidStatus: RailgunTxidStatus;
  shieldQueueStatus: ShieldQueueStatus;
  listStatuses: Record<string, POIListStatus>;
  legacyTransactProofs: number;
};

export const POI_SHIELD_PENDING_SEC = 60 * 60; // 1 hour
export const POI_SHIELD_PENDING_SEC_TEXT = 'One hour';
export const POI_SHIELD_PENDING_SEC_TEST_NET = 1 * 60; // 1 minute
export const POI_SHIELD_PENDING_SEC_TEST_NET_TEXT = 'One minute';

export enum POIListType {
  Active = 'Active',
  Gather = 'Gather',
}

export type POIList = {
  key: string;
  type: POIListType;
  name: string;
  description: string;
};

export const POI_REQUIRED_LISTS: POIList[] = [
  {
    key: 'efc6ddb59c098a13fb2b618fdae94c1c3a807abc8fb1837c93620c9143ee9e88',
    type: POIListType.Active,
    name: 'Chainalysis OFAC Sanctions API',
    description:
      'API which is used to restrict bad actors designated by the US Department of the Treasury. See: https://www.chainalysis.com/free-cryptocurrency-sanctions-screening-tools.',
  },
];

export enum POIJSONRPCMethod {
  NodeStatus = 'ppoi_node_status',
  POIEvents = 'ppoi_poi_events',
  POIMerkletreeLeaves = 'ppoi_poi_merkletree_leaves',
  TransactProofs = 'ppoi_transact_proofs',
  LegacyTransactProofs = 'ppoi_legacy_transact_proofs',
  BlockedShields = 'ppoi_blocked_shields',
  SubmitPOIEvents = 'ppoi_submit_poi_events',
  SubmitValidatedTXID = 'ppoi_submit_validated_txid',
  RemoveTransactProof = 'ppoi_remove_transact_proof',
  SubmitTransactProof = 'ppoi_submit_transact_proof',
  SubmitLegacyTransactProofs = 'ppoi_submit_legacy_transact_proofs',
  SubmitSingleCommitmentProofs = 'ppoi_submit_single_commitment_proofs',
  POIsPerList = 'ppoi_pois_per_list',
  POIsPerBlindedCommitment = 'ppoi_pois_per_blinded_commitment',
  MerkleProofs = 'ppoi_merkle_proofs',
  ValidatedTXID = 'ppoi_validated_txid',
  ValidateTXIDMerkleroot = 'ppoi_validate_txid_merkleroot',
  ValidatePOIMerkleroots = 'ppoi_validate_poi_merkleroots',
}
