import { NetworkName } from './network-config';

export enum POINetworkStatus {
  Screen = 'Screen',
  Gather = 'Gather',
}

export type ShieldProofData = {
  snarkProof: SnarkProof;
  commitmentHash: string;
  blindedCommitment: string;
};

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

export type POIEventListStatus = {
  length: number;
};

export type GetShieldProofsParams = {
  bloomFilterSerialized: string;
};

export type GetTransactProofsParams = {
  bloomFilterSerialized: string;
};

export type SubmitShieldProofParams = {
  shieldProofData: ShieldProofData;
};

export type SubmitTransactProofParams = {
  listKey: string;
  transactProofData: TransactProofData;
};

export type GetPOIsPerListParams = {
  listKeys: string[];
  blindedCommitments: string[];
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
  // Proof submitted, but not validated yet
  Pending = 'Pending',
  // No proof
  Missing = 'Missing',
}

export type POIStatusListMap = {
  [listKey: string]: POIStatus[];
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
  eventListStatuses: Record<string, POIEventListStatus>;
};
