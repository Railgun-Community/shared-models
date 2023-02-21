import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { assertArtifactExists } from '../artifact-v2';

chai.use(chaiAsPromised);
const { expect } = chai;

const VALID_INPUT_COUNTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const VALID_OUTPUT_COUNTS = [1, 2, 3, 4, 5];

describe('artifact-v2', () => {
  it('Should find available artifacts', () => {
    const invalidNullifiers = 1;
    const invalidCommitments = 6;
    expect(() =>
      assertArtifactExists(invalidNullifiers, invalidCommitments),
    ).to.throw('No artifacts for inputs: 1-6');

    VALID_OUTPUT_COUNTS.forEach(outputCount => {
      VALID_INPUT_COUNTS.forEach(inputCount => {
        if (inputCount === 10 && outputCount === 5) {
          // We don't have a circuit for this case.
          expect(() => assertArtifactExists(inputCount, outputCount)).to.throw(
            'No artifacts for inputs: 10-5',
          );
          return;
        }

        // Test that artifacts exist for each INPUT x OUTPUT combination.
        expect(() =>
          assertArtifactExists(inputCount, outputCount),
        ).not.to.throw();
      });
    });

    // Other artifact combinations
    expect(() => assertArtifactExists(11, 1)).not.to.throw();
    expect(() => assertArtifactExists(12, 1)).not.to.throw();
    expect(() => assertArtifactExists(13, 1)).not.to.throw();
    expect(() => assertArtifactExists(1, 10)).not.to.throw();
    expect(() => assertArtifactExists(1, 13)).not.to.throw();
  });
});
