import { PopulatedTransaction } from '@ethersproject/contracts';
import { parse, serialize, Transaction } from '@ethersproject/transactions';
import { TransactionRequest } from '@ethersproject/providers';

const validatePreserialize = (transaction: PopulatedTransaction) => {
  if (transaction.from) {
    throw new Error(`Cannot serialize 'from' field on transaction.`);
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
  return {
    ...transaction,
    type: transaction.type ?? undefined,
    nonce,
    chainId,
  };
};
