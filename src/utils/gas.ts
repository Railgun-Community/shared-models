/// <reference types="../types/global" />
import { BigNumber } from '@ethersproject/bignumber';
import { NetworkName, NETWORK_CONFIG } from '../models/network-config';
import {
  EVMGasType,
  TransactionGasDetails,
  TransactionGasDetailsSerialized,
} from '../models/response-types';

export const getEVMGasTypeForTransaction = (
  networkName: NetworkName,
  sendWithPublicWallet: boolean,
): EVMGasType => {
  const { defaultEVMGasType } = NETWORK_CONFIG[networkName];

  if (defaultEVMGasType === EVMGasType.Type2 && !sendWithPublicWallet) {
    // Relayer transactions require overallBatchMinGasPrice.
    // This is only supported by type 1 transactions.
    return EVMGasType.Type1;
  }

  return defaultEVMGasType;
};

export const calculateGasLimit = (gasEstimate: BigNumber): BigNumber => {
  // Gas Limit: Add 20% to gas estimate.
  return gasEstimate.mul(12000).div(10000);
};

export const calculateGasPrice = (gasDetails: TransactionGasDetails) => {
  switch (gasDetails.evmGasType) {
    case EVMGasType.Type0:
    case EVMGasType.Type1: {
      return gasDetails.gasPrice;
    }
    case EVMGasType.Type2: {
      return gasDetails.maxFeePerGas;
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

export const serializeTransactionGasDetails = (
  gasDetails: TransactionGasDetails,
): TransactionGasDetailsSerialized => {
  switch (gasDetails.evmGasType) {
    case EVMGasType.Type0:
    case EVMGasType.Type1: {
      const { evmGasType, gasEstimate, gasPrice } = gasDetails;
      return {
        evmGasType,
        gasEstimateString: gasEstimate.toHexString(),
        gasPriceString: gasPrice.toHexString(),
      };
    }
    case EVMGasType.Type2: {
      const { evmGasType, gasEstimate, maxFeePerGas, maxPriorityFeePerGas } =
        gasDetails;
      return {
        evmGasType,
        gasEstimateString: gasEstimate.toHexString(),
        maxFeePerGasString: maxFeePerGas.toHexString(),
        maxPriorityFeePerGasString: maxPriorityFeePerGas.toHexString(),
      };
    }
  }
};

export const deserializeTransactionGasDetails = (
  gasDetailsSerialized: Optional<TransactionGasDetailsSerialized>,
): Optional<TransactionGasDetails> => {
  if (!gasDetailsSerialized) {
    return undefined;
  }
  switch (gasDetailsSerialized.evmGasType) {
    case EVMGasType.Type0:
    case EVMGasType.Type1: {
      const { evmGasType, gasEstimateString, gasPriceString } =
        gasDetailsSerialized;
      return {
        evmGasType,
        gasEstimate: BigNumber.from(gasEstimateString),
        gasPrice: BigNumber.from(gasPriceString),
      };
    }
    case EVMGasType.Type2: {
      const {
        evmGasType,
        gasEstimateString,
        maxFeePerGasString,
        maxPriorityFeePerGasString,
      } = gasDetailsSerialized;
      return {
        evmGasType,
        gasEstimate: BigNumber.from(gasEstimateString),
        maxFeePerGas: BigNumber.from(maxFeePerGasString),
        maxPriorityFeePerGas: BigNumber.from(maxPriorityFeePerGasString),
      };
    }
  }
};
