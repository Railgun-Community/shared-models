import { PopulatedTransaction } from '@ethersproject/contracts';
import { parse, serialize, Transaction } from '@ethersproject/transactions';
import { TransactionRequest } from '@ethersproject/providers';
import { EVMGasType } from '../models/response-types';

const validatePreserialize = (transaction: PopulatedTransaction) => {
  if (transaction.from) {
    throw new Error(`Cannot serialize 'from' field on transaction.`);
  }
  if (transaction.type === EVMGasType.Type0 && transaction.accessList) {
    throw new Error(
      `Cannot serialize 'accessList' field on Type0 transaction.`,
    );
  }
};

export const serializeUnsignedTransaction = (
  transaction: PopulatedTransaction,
): string => {
  validatePreserialize(transaction);
  return serialize(transaction);
};

// export const serializeSignedTransaction = (
//   transaction: PopulatedTransaction,
//   signature: SignatureLike,
// ): string => {
//   validatePreserialize(transaction);
//   return serialize(transaction, signature);
// };

export const deserializeTransaction = (
  rawTransaction: string,
  nonce: Optional<number>,
  chainId: number,
): TransactionRequest => {
  const transaction: Transaction = parse(rawTransaction);
  return cleanTransaction({
    ...transaction,
    type: transaction.type ?? undefined,
    nonce,
    chainId,

    // Set gas-related vars as undefined if they're zero.
    gasLimit: transaction.gasLimit?.eq(0) ? undefined : transaction.gasLimit,
    gasPrice: transaction.gasPrice?.eq(0) ? undefined : transaction.gasPrice,
    maxFeePerGas: transaction.maxFeePerGas?.eq(0)
      ? undefined
      : transaction.maxFeePerGas,
    maxPriorityFeePerGas: transaction.maxPriorityFeePerGas?.eq(0)
      ? undefined
      : transaction.maxPriorityFeePerGas,
  });
};

const cleanTransaction = (tx: TransactionRequest): TransactionRequest => {
  // Remove keys that have an undefined value
  return Object.fromEntries(
    Object.entries(tx).filter(([_k, v]) => v !== undefined),
  );
};
