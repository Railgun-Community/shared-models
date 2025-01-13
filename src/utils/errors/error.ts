import { isDefined } from '../util';

const STRING_PREFIX_AFTER_UNICODE_REPLACEMENT = 'y %';


class CustomError extends Error {
  originalError: Error;

  constructor(message: string, originalError: Error) { 
    super(message);
    this.name = 'CustomError';
    this.originalError = originalError;
  }
}

class RailgunContractError extends Error {
  originalError: Error;

  constructor(message: string, originalError: Error) { 
    super(message);
    this.name = 'RailgunContractError';
    this.originalError = originalError;
  }
}

const validAscii = (str: string) => {
  return str.replace(
    // eslint-disable-next-line no-useless-escape
    /[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g,
    '',
  );
};

const isRailgunError = (cause: Error): boolean => cause.message.toLowerCase().includes('railgunsmartwallet')

export const sanitizeError = (cause: Error): Error => {
  if (isDefined(cause) && cause.message) {
    const lowercaseMsg = cause.message.toLowerCase();

    if (isRailgunError(cause)) {
      return cause;
    }

    if (
      lowercaseMsg.includes('quorum') || // Connection error
      lowercaseMsg.includes('could not connect to') // Connection error
    ) {
      return new Error('Could not connect.', { cause });
    }
    if (lowercaseMsg.includes('call revert exception')) { 
      return new Error('Failed to connect to RPC.', { cause }); // RPC_ERROR
    }
    if (lowercaseMsg.includes('already known')) {
      return new Error(
        'Transaction successful but ethers request for TXID failed.',
        { cause }, // KNOWN_TRANSACTION
      );
    }
    if (lowercaseMsg.includes('missing revert data')) {
      return new Error('RPC connection error.', { cause }); // RPC_ERROR
    }
    if (
      lowercaseMsg.includes(
        'transaction may fail or may require manual gas limit',
      )
    ) {
      return new Error('Unknown error. Transaction failed.', { cause }); // @@TODO: Replace or categorize better 
    }
    if (lowercaseMsg.includes('replacement fee too low')) {
      return new Error(
        'Nonce is used in a pending transaction, and replacement fee is too low. Please increase your network fee to replace the pending transaction.',
        { cause }, // LOW_REPLACEMENT_FEE
      );
    }
    if (lowercaseMsg.includes('intrinsic gas too low')) {
      return new Error(
        'Gas price rejected. Please select a higher gas price or resubmit.',
        { cause }, // LOW_GAS
      );
    }
    if (lowercaseMsg.includes('transaction underpriced')) {
      return new Error(
        'Gas fee too low. Please select a higher gas price and resubmit.',
        { cause }, // LOW_GAS_RESUBMIT
      );
    }
    if (lowercaseMsg.includes('insufficient funds for intrinsic')) {
      return new Error('Insufficient gas to process transaction.', { cause }); // INSUFFICIENT_GAS
    }
    if (lowercaseMsg.includes('nonce has already been used')) {
      return new Error(
        // Do not change 'Nonce already used' string of Error message.
        'Nonce already used: the transaction was already completed.',
        { cause }, // NONCE_USED
      );
    }
    if (lowercaseMsg.includes('error while dialing dial tcp')) {
      return new Error(
        'Error while connecting to RPC provider. Please try again.',
        { cause }, // RPC_ERROR
      );
    }
    if (
      lowercaseMsg.includes('spendable private balance too low') &&
      lowercaseMsg.includes('broadcaster fee')
    ) {
      return new Error('Private balance too low to pay broadcaster fee.', {
        cause, // LOW_PRIVATE_BALANCE
      });
    }

    // Custom RAILGUN contract error messages
    if (lowercaseMsg.includes('railgunsmartwallet')) {
      if (lowercaseMsg.includes('invalid nft note value')) { // INVALID_NFT_NOTE
        return new RailgunContractError('RailgunSmartWallet: Invalid NFT Note Value.', cause); // INVALID_NFT_NOTE
      }
      if (lowercaseMsg.includes('unsupported token')) {
        return new RailgunContractError(
          'RailgunSmartWallet: Unsupported Token. This token cannot interact with the RAILGUN contract.',// UNSUPPORTED_TOKEN
          cause,
        );
      }
      if (lowercaseMsg.includes('invalid note value')) {  // INVALID_NOTE_VALUE
        return new RailgunContractError(
          'RailgunSmartWallet: Invalid Note Value. Please submit transaction with a corrected amount.',
          cause,
        );
      }
      if (lowercaseMsg.includes('invalid adapt contract as sender')) { // INVALID_ADAPT_CONTRACT_SENDER
        return new RailgunContractError(
          'RailgunSmartWallet: Invalid Adapt Contract as Sender. Please update your frontend to current Adapt module versions.',
          cause,
        );
      }
      if (lowercaseMsg.includes('invalid merkle root')) { // INVALID_MERKLE_ROOT
        return new RailgunContractError(
          'RailgunSmartWallet: Invalid Merkle Root. Please sync your balances and try again.',
          cause,
        );
      }
      if (lowercaseMsg.includes('note already spent')) { // NOTE_SPENT
        return new RailgunContractError(
          'RailgunSmartWallet: Note Already Spent. Please sync your balances and try again.',
          cause,
        );
      }
      if (lowercaseMsg.includes('invalid note ciphertext array length')) { // INVALID_NOTE_CIPHERTEXT_ARRAY_LENGTH
        return new RailgunContractError(
          'RailgunSmartWallet: Invalid Note Ciphertext Array Length. Please sync balances and re-prove your transaction.',
          cause,
        );
      }
      if (lowercaseMsg.includes('invalid withdraw note')) { // INVALID_WITHDRAW_NOTE
        return new RailgunContractError(
          'RailgunSmartWallet: Invalid Unshield Note. Please sync balances and re-prove your transaction.',
          cause,
        );
      }
      if (lowercaseMsg.includes('invalid snark proof')) { // INVALID_SNARK_PROOF
        return new RailgunContractError(
          'RailgunSmartWallet: Invalid Snark Proof. Please re-prove your transaction.',
          cause,
        );
      }
    }

    return new Error(
      validAscii(cause.message).replace(
        `:${STRING_PREFIX_AFTER_UNICODE_REPLACEMENT}`,
        ': ',
      ),
    );
  }

  return new CustomError('Unknown error. Please try again', cause);
};
