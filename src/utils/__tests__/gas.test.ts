import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { calculateGasLimit, calculateMaximumGas } from '../gas';
import { EVMGasType, TransactionGasDetails } from '../../models/response-types';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('gas', () => {
  it('Should calculate gas limit correctly', () => {
    const gasEstimate = BigInt('100000');
    const gasLimit = calculateGasLimit(gasEstimate);
    expect(Number(gasLimit)).to.equal(120000);
  });

  it('Should calculate maximum gas correctly', () => {
    const gasDetails: TransactionGasDetails = {
      evmGasType: EVMGasType.Type2,
      gasEstimate: BigInt('100000'),
      maxFeePerGas: BigInt('20000'),
      maxPriorityFeePerGas: BigInt('500'),
    };
    const gasLimit = calculateMaximumGas(gasDetails);
    expect(gasLimit.toString()).to.equal('2400000000');
  });
});
