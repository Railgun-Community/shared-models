import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { getUpperBoundMedian } from '../median';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('median', () => {
  it('Should get upper bound median of number set', () => {
    expect(getUpperBoundMedian([])).to.equal(0);
    expect(getUpperBoundMedian([1])).to.equal(1);
    expect(getUpperBoundMedian([1, 2])).to.equal(2);
    expect(getUpperBoundMedian([1, 2, 5, 6])).to.equal(5);
    expect(getUpperBoundMedian([1, 2, 5, 6, 7])).to.equal(5);
    expect(getUpperBoundMedian([1, 2, 6, 7, 5])).to.equal(5);
    expect(getUpperBoundMedian([9, 10])).to.equal(10);
    expect(getUpperBoundMedian([8, 9, 10])).to.equal(9);
    expect(getUpperBoundMedian([23_600_000, 9_400_000])).to.equal(23_600_000);
  });
});
