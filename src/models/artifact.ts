import type { Optional } from '../types/global';

export type Artifact = {
  zkey: ArrayLike<number>;
  wasm: Optional<ArrayLike<number>>;
  dat: Optional<ArrayLike<number>>;
  vkey: object;
};

export enum ArtifactName {
  ZKEY = 'zkey',
  WASM = 'wasm',
  VKEY = 'vkey',
  DAT = 'dat',
}

export type ArtifactMapping = {
  [name in ArtifactName]: string;
};

export type ArtifactDownloadedGroup = {
  [name in ArtifactName]: boolean;
};
