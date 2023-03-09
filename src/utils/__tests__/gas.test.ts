import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { BigNumber } from '@ethersproject/bignumber';
import {
  calculateGasLimit,
  calculateMaximumGas,
  deserializeTransactionGasDetails,
  serializeTransactionGasDetails,
} from '../gas';
import { decimalStringToHexString, decimalToHexString } from '../format';
import {
  EVMGasType,
  TransactionGasDetails,
  TransactionGasDetailsSerialized,
} from '../../models/response-types';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('gas', () => {
  it('Should calculate gas limit correctly', () => {
    const gasEstimate = BigNumber.from('100000');
    const gasLimitString = calculateGasLimit(gasEstimate).toHexString();
    expect(gasLimitString).to.equal(decimalStringToHexString('120000'));
  });

  it('Should calculate maximum gas correctly', () => {
    const gasDetails: TransactionGasDetails = {
      evmGasType: EVMGasType.Type2,
      gasEstimate: BigNumber.from('100000'),
      maxFeePerGas: BigNumber.from('20000'),
      maxPriorityFeePerGas: BigNumber.from('500'),
    };
    const gasLimitString = calculateMaximumGas(gasDetails).toHexString();
    expect(gasLimitString).to.equal(decimalStringToHexString('2400000000'));
  });

  it('Should serialize tx gas details', () => {
    const gasDetails: TransactionGasDetails = {
      evmGasType: EVMGasType.Type2,
      gasEstimate: BigNumber.from('10'),
      maxFeePerGas: BigNumber.from('20'),
      maxPriorityFeePerGas: BigNumber.from('1'),
    };
    const serialized = serializeTransactionGasDetails(gasDetails);
    const expectedSerialized: TransactionGasDetailsSerialized = {
      evmGasType: EVMGasType.Type2,
      gasEstimateString: decimalToHexString(10),
      maxFeePerGasString: decimalToHexString(20),
      maxPriorityFeePerGasString: decimalToHexString(1),
    };
    expect(serialized).to.deep.equal(expectedSerialized);
    expect(deserializeTransactionGasDetails(serialized)).to.deep.equal(
      gasDetails,
    );
  });
});
