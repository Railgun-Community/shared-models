import { TXIDVersion } from './engine';
import { NetworkName } from './network-config';
import { PreTransactionPOIsPerTxidLeafPerList } from './response-types';

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
  pendingTransactProofs: number;
  blockedShields: number;
};

export type GetTransactProofsParams = {
  txidVersion: TXIDVersion;
  bloomFilterSerialized: string;
  listKey: string;
};

export type GetBlockedShieldsParams = {
  txidVersion: TXIDVersion;
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

export type SubmitTransactProofParams = {
  txidVersion: TXIDVersion;
  listKey: string;
  transactProofData: TransactProofData;
};

export type SubmitLegacyTransactProofParams = {
  txidVersion: TXIDVersion;
  listKeys: string[];
  legacyTransactProofDatas: LegacyTransactProofData[];
};

export type SubmitSingleCommitmentProofsParams = {
  txidVersion: TXIDVersion;
  singleCommitmentProofsData: SingleCommitmentProofsData;
};

export enum BlindedCommitmentType {
  Shield = 'Shield',
  Transact = 'Transact',
  Unshield = 'Unshield',
}

export type ValidatePOIMerklerootsParams = {
  txidVersion: TXIDVersion;
  listKey: string;
  poiMerkleroots: string[];
};

export type BlindedCommitmentData = {
  blindedCommitment: string;
  type: BlindedCommitmentType;
};

export type GetPOIsPerListParams = {
  txidVersion: TXIDVersion;
  listKeys: string[];
  blindedCommitmentDatas: BlindedCommitmentData[];
};

export type GetMerkleProofsParams = {
  txidVersion: TXIDVersion;
  listKey: string;
  blindedCommitments: string[];
};

export type ValidateTxidMerklerootParams = {
  txidVersion: TXIDVersion;
  tree: number;
  index: number;
  merkleroot: string;
};

export type GetLatestValidatedRailgunTxidParams = {
  txidVersion: TXIDVersion;
};

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

export const POI_SHIELD_PENDING_SEC = 60 * 60 * 60; // 60 hours
export const POI_SHIELD_PENDING_SEC_TEST_NET = 5 * 60; // 5 minutes

export type POIList = {
  key: string;
  type: POIListType;
  name: string;
  description: string;
};
export declare enum POIListType {
  Active = 'Active',
  Gather = 'Gather',
}

export const POI_REQUIRED_LISTS: POIList[] = [
  {
    key: 'efc6ddb59c098a13fb2b618fdae94c1c3a807abc8fb1837c93620c9143ee9e88',
    type: POIListType.Active,
    name: 'Chainalysis OFAC Sanctions API',
    description:
      'API which is used to restrict bad actors designated by the US Department of the Treasury. See: https://www.chainalysis.com/free-cryptocurrency-sanctions-screening-tools.',
  },
];
