import { NetworkName } from './network-config';

export type TransactProofData = {
  snarkProof: SnarkProof;
  poiMerkleroots: string[];
  txidMerkleroot: string;
  txidMerklerootIndex: number;
  blindedCommitmentOutputs: string[];
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

export type POIListStatus = {
  poiEvents: number;
  pendingTransactProofs: number;
  blockedShields: number;
};

export type GetTransactProofsParams = {
  bloomFilterSerialized: string;
};

export type GetBlockedShieldsParams = {
  bloomFilterSerialized: string;
};

export type SubmitTransactProofParams = {
  listKey: string;
  transactProofData: TransactProofData;
};

export enum BlindedCommitmentType {
  Shield = 'Shield',
  Transact = 'Transact',
}

export type BlindedCommitmentData = {
  blindedCommitment: string;
  type: BlindedCommitmentType;
};

export type GetPOIsPerListParams = {
  listKeys: string[];
  blindedCommitmentDatas: BlindedCommitmentData[];
};

export type GetMerkleProofsParams = {
  listKey: string;
  blindedCommitments: string[];
};

export type ValidateTxidMerklerootParams = {
  tree: number;
  index: number;
  merkleroot: string;
};

export enum POIStatus {
  // POI valdated in event list
  Valid = 'Valid',
  // Shield indexed, but not allowed or blocked yet
  ShieldPending = 'ShieldPending',
  // Shield blocked
  ShieldBlocked = 'ShieldBlocked',
  // Transact proof submitted, but not validated yet
  TransactProofSubmitted = 'TransactProofSubmitted',
  // No proof
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
};
