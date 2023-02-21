import ArtifactsMetadata from '../json/artifact.json';

export const artifactExists = (
  nullifiers: number,
  commitments: number,
): boolean => {
  const found = ArtifactsMetadata.find(
    artifact =>
      artifact.nullifiers === nullifiers &&
      artifact.commitments === commitments,
  );
  return found != null;
};

export const assertArtifactExists = (
  nullifiers: number,
  commitments: number,
) => {
  if (artifactExists(nullifiers, commitments)) {
    return;
  }
  throw new Error(`No artifacts for inputs: ${nullifiers}-${commitments}`);
};

export const ipfsHashForArtifact = (
  nullifiers: number,
  commitments: number,
): string => {
  const artifact = ArtifactsMetadata.find(
    artifact =>
      artifact.nullifiers === nullifiers &&
      artifact.commitments === commitments,
  );
  if (!artifact) {
    throw new Error(`No artifacts for inputs: ${nullifiers}-${commitments}`);
  }
  return artifact.contractVKey.artifactsIPFSHash;
};
