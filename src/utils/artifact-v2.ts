import ArtifactsMetadata from '../json/artifacts.json';

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

const artifactError = (nullifiers: number, commitments: number) => {
  return new Error(`No artifacts for inputs: ${nullifiers}-${commitments}`);
};

export const assertArtifactExists = (
  nullifiers: number,
  commitments: number,
) => {
  if (artifactExists(nullifiers, commitments)) {
    return;
  }
  throw artifactError(nullifiers, commitments);
};
