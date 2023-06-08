import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { isDefined, removeUndefineds } from '../util';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('util', () => {
  it('Should test isDefined', () => {
    expect(isDefined(undefined)).to.equal(false);
    expect(isDefined(null)).to.equal(false);
    expect(isDefined('')).to.equal(true);
    expect(isDefined(0)).to.equal(true);
  });

  it('Should test removeUndefineds', () => {
    expect(removeUndefineds([undefined])).to.deep.equal([]);
    expect(removeUndefineds([null])).to.deep.equal([]);
    expect(removeUndefineds([''])).to.deep.equal(['']);
    expect(removeUndefineds([0, 2])).to.deep.equal([0, 2]);
  });
});
