import { NetworkName, NETWORK_CONFIG } from '../models/network-config';
import { EVMGasType, TransactionGasDetails } from '../models/response-types';

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

export const calculateGasLimit = (gasEstimate: bigint): bigint => {
  // Gas Limit: Add 20% to gas estimate.
  return (gasEstimate * 12000n) / 10000n;
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
  return gasEstimate * gasPrice;
};

export const calculateMaximumGas = (
  transactionGasDetails: TransactionGasDetails,
): bigint => {
  const gasPrice = calculateGasPrice(transactionGasDetails);
  const { gasEstimate } = transactionGasDetails;
  return calculateGasLimit(gasEstimate) * gasPrice;
};
