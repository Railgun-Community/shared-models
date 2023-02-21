export enum ArtifactName {
  ZKEY = 'zkey',
  WASM = 'wasm',
  VKEY = 'vkey',
  DAT = 'dat',
}

export type ArtifactGroup = {
  [ArtifactName.ZKEY]: Buffer;
  [ArtifactName.VKEY]: object;
  [ArtifactName.WASM]: Optional<Buffer>;
  [ArtifactName.DAT]: Optional<Buffer>;
};

export type ArtifactMapping = {
  [ArtifactName.ZKEY]: string;
  [ArtifactName.WASM]: string;
  [ArtifactName.VKEY]: string;
  [ArtifactName.DAT]: string;
};

export type ArtifactDownloadedGroup = {
  [ArtifactName.ZKEY]: boolean;
  [ArtifactName.WASM]: boolean;
  [ArtifactName.VKEY]: boolean;
  [ArtifactName.DAT]: boolean;
};
