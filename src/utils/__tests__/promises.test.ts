/// <reference types="../../types/global" />
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { delay, promiseTimeout, poll } from '../promises';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('promises', () => {
  it('Should test delay function', async () => {
    const preDate = Date.now();
    await delay(5);
    const postDate = Date.now();
    // Typically 4-6 ms. (For some reason it can be 1 ms below).
    expect(postDate - preDate).to.be.greaterThanOrEqual(4);
  });

  it('Should test rejecting promiseTimeout', async () => {
    const preDate = Date.now();
    await expect(promiseTimeout(delay(20), 5)).to.be.rejectedWith(
      'Timed out in 5 ms.',
    );
    const postDate = Date.now();
    expect(postDate - preDate).to.be.greaterThanOrEqual(4);
  });

  it('Should test custom promiseTimeout error message', async () => {
    await expect(
      promiseTimeout(delay(20), 5, new Error('Custom')),
    ).to.be.rejectedWith('Custom');
  });

  it('Should test resolving promiseTimeout', async () => {
    const preDate = Date.now();
    const result = await promiseTimeout(delay(5), 15);
    expect(result).to.be.undefined;
    const postDate = Date.now();
    expect(postDate - preDate).to.be.greaterThanOrEqual(4);
  });

  it('Should test poll that times out', async () => {
    let i = 0;
    const fn = async () => i++;
    const passCondition = (i: number) => i > 7;
    const result = await poll<number>(fn, passCondition, 2, 5);
    expect(result).to.be.undefined;
  });

  it('Should test poll that resolves after multiple attempts', async () => {
    let i = 0;
    const fn = async () => i++;
    const passCondition = (i: number) => i > 2;
    const result = await poll<number>(fn, passCondition, 2, 5);
    expect(result).to.equal(3);
  });
});
