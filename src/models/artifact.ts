export enum ArtifactName {
  ZKEY = 'zkey',
  WASM = 'wasm',
  VKEY = 'vkey',
  DAT = 'dat',
}

export enum ArtifactVariant {
  Variant_8_by_2 = '8x2',
  Variant_2_by_3 = '2x3',
  Variant_2_by_2 = '2x2',
  Variant_1_by_3 = '1x3',
  Variant_1_by_2 = '1x2',
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

export type ArtifactVariantMapping = {
  [artifactVariant in ArtifactVariant]: ArtifactMapping;
};

// Files hosted at https://beacon.railgun.ch/<URL_PATH>
export const ARTIFACT_URL_PATHS_VARIANTS_V1: ArtifactVariantMapping = {
  [ArtifactVariant.Variant_1_by_2]: {
    [ArtifactName.VKEY]: 'artifacts_v1/1-2/vkey.json',
    [ArtifactName.ZKEY]: 'artifacts_v1/1-2/zkey.br',
    [ArtifactName.WASM]: 'artifacts_v1/1-2/wasm.br',
    [ArtifactName.DAT]: 'artifacts_v1/1-2/native.br',
  },
  [ArtifactVariant.Variant_1_by_3]: {
    [ArtifactName.VKEY]: 'artifacts_v1/1-3/vkey.json',
    [ArtifactName.ZKEY]: 'artifacts_v1/1-3/zkey.br',
    [ArtifactName.WASM]: 'artifacts_v1/1-3/wasm.br',
    [ArtifactName.DAT]: 'artifacts_v1/1-3/native.br',
  },
  [ArtifactVariant.Variant_2_by_2]: {
    [ArtifactName.VKEY]: 'artifacts_v1/2-2/vkey.json',
    [ArtifactName.ZKEY]: 'artifacts_v1/2-2/zkey.br',
    [ArtifactName.WASM]: 'artifacts_v1/2-2/wasm.br',
    [ArtifactName.DAT]: 'artifacts_v1/2-2/native.br',
  },
  [ArtifactVariant.Variant_2_by_3]: {
    [ArtifactName.VKEY]: 'artifacts_v1/2-3/vkey.json',
    [ArtifactName.ZKEY]: 'artifacts_v1/2-3/zkey.br',
    [ArtifactName.WASM]: 'artifacts_v1/2-3/wasm.br',
    [ArtifactName.DAT]: 'artifacts_v1/2-3/native.br',
  },
  [ArtifactVariant.Variant_8_by_2]: {
    [ArtifactName.VKEY]: 'artifacts_v1/8-2/vkey.json',
    [ArtifactName.ZKEY]: 'artifacts_v1/8-2/zkey.br',
    [ArtifactName.WASM]: 'artifacts_v1/8-2/wasm.br',
    [ArtifactName.DAT]: 'artifacts_v1/8-2/native.br',
  },
};
