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
