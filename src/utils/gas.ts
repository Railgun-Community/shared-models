import { BigNumber } from '@ethersproject/bignumber';
import { EVMGasType } from '../models/network-config';
import { TransactionGasDetails } from '../models/response-types';

export const calculateGasLimit = (gasEstimate: BigNumber): BigNumber => {
  // Gas Limit: Add 20% to gas estimate.
  return gasEstimate.mul(12000).div(10000);
};

const calculateGasPrice = (gasDetails: TransactionGasDetails) => {
  switch (gasDetails.evmGasType) {
    case EVMGasType.Type0: {
      return gasDetails.gasPrice;
    }
    case EVMGasType.Type2: {
      const { maxFeePerGas, maxPriorityFeePerGas } = gasDetails;
      return maxFeePerGas.add(maxPriorityFeePerGas);
    }
  }
};

export const calculateTotalGas = (
  transactionGasDetails: TransactionGasDetails,
) => {
  const gasPrice = calculateGasPrice(transactionGasDetails);
  const { gasEstimate } = transactionGasDetails;
  return gasEstimate.mul(gasPrice);
};

export const calculateMaximumGas = (
  transactionGasDetails: TransactionGasDetails,
): BigNumber => {
  const gasPrice = calculateGasPrice(transactionGasDetails);
  const { gasEstimate } = transactionGasDetails;
  return calculateGasLimit(gasEstimate).mul(gasPrice);
};
