import { isDefined } from './util';

const STRING_PREFIX_AFTER_UNICODE_REPLACEMENT = 'y %';

const validAscii = (str: string) => {
  return str.replace(
    // eslint-disable-next-line no-useless-escape
    /[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g,
    '',
  );
};

export const sanitizeError = (cause: Error): Error => {
  if (isDefined(cause) && cause.message) {
    const lowercaseMsg = cause.message.toLowerCase();
    if (
      lowercaseMsg.includes('quorum') ||
      lowercaseMsg.includes('could not connect to')
    ) {
      return new Error('Could not connect.', { cause });
    }
    if (lowercaseMsg.includes('call revert exception')) {
      return new Error('Failed to connect to RPC.', { cause });
    }
    if (lowercaseMsg.includes('already known')) {
      return new Error(
        'Transaction successful but ethers request for TXID failed.',
        { cause },
      );
    }
    if (lowercaseMsg.includes('missing revert data')) {
      return new Error('RPC connection error.', { cause });
    }
    if (
      lowercaseMsg.includes(
        'transaction may fail or may require manual gas limit',
      )
    ) {
      return new Error('Unknown error. Transaction failed.', { cause });
    }
    if (lowercaseMsg.includes('replacement fee too low')) {
      return new Error(
        'Nonce is used in a pending transaction, and replacement fee is too low. Please increase your network fee to replace the pending transaction.',
        { cause },
      );
    }
    if (lowercaseMsg.includes('intrinsic gas too low')) {
      return new Error(
        'Gas price rejected. Please select a higher gas price or resubmit.',
        { cause },
      );
    }
    if (lowercaseMsg.includes('transaction underpriced')) {
      return new Error(
        'Gas fee too low. Please select a higher gas price and resubmit.',
        { cause },
      );
    }
    if (lowercaseMsg.includes('insufficient funds for intrinsic')) {
      return new Error('Insufficient gas to process transaction.', { cause });
    }
    if (lowercaseMsg.includes('nonce has already been used')) {
      return new Error(
        // Do not change 'Nonce already used' string of Error message.
        'Nonce already used: the transaction was already completed.',
        { cause },
      );
    }
    if (lowercaseMsg.includes('error while dialing dial tcp')) {
      return new Error(
        'Error while connecting to RPC provider. Please try again.',
        { cause },
      );
    }
    if (
      lowercaseMsg.includes('spendable private balance too low') &&
      lowercaseMsg.includes('relayer fee')
    ) {
      return new Error('Private balance too low to pay relayer fee.', {
        cause,
      });
    }

    // Custom RAILGUN contract error messages
    if (lowercaseMsg.includes('railgunsmartwallet')) {
      if (lowercaseMsg.includes('invalid nft note value')) {
        return new Error('RailgunSmartWallet: Invalid NFT Note Value.', {
          cause,
        });
      }
      if (lowercaseMsg.includes('unsupported token')) {
        return new Error(
          'RailgunSmartWallet: Unsupported Token. This token cannot interact with the RAILGUN contract.',
          { cause },
        );
      }
      if (lowercaseMsg.includes('invalid note value')) {
        return new Error(
          'RailgunSmartWallet: Invalid Note Value. Please submit transaction with a corrected amount.',
          { cause },
        );
      }
      if (lowercaseMsg.includes('invalid adapt contract as sender')) {
        return new Error(
          'RailgunSmartWallet: Invalid Adapt Contract as Sender. Please update your frontend to current Adapt module versions.',
          { cause },
        );
      }
      if (lowercaseMsg.includes('invalid merkle root')) {
        return new Error(
          'RailgunSmartWallet: Invalid Merkle Root. Please sync your balances and try again.',
          { cause },
        );
      }
      if (lowercaseMsg.includes('note already spent')) {
        return new Error(
          'RailgunSmartWallet: Note Already Spent. Please sync your balances and try again.',
          { cause },
        );
      }
      if (lowercaseMsg.includes('invalid note ciphertext array length')) {
        return new Error(
          'RailgunSmartWallet: Invalid Note Ciphertext Array Length. Please sync balances and re-prove your transaction.',
          { cause },
        );
      }
      if (lowercaseMsg.includes('invalid withdraw note')) {
        return new Error(
          'RailgunSmartWallet: Invalid Unshield Note. Please sync balances and re-prove your transaction.',
          { cause },
        );
      }
      if (lowercaseMsg.includes('invalid snark proof')) {
        return new Error(
          'RailgunSmartWallet: Invalid Snark Proof. Please re-prove your transaction.',
          { cause },
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

  return new Error('Unknown error. Please try again.', { cause });
};
