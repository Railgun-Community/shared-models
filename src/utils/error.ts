const STRING_PREFIX_AFTER_UNICODE_REPLACEMENT = 'y %';

const validAscii = (str: string) => {
  return str.replace(
    // eslint-disable-next-line no-useless-escape
    /[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g,
    '',
  );
};

export const sanitizeError = (err: Error): Error => {
  if (err && err.message) {
    const lowercaseMsg = err.message.toLowerCase();
    if (
      lowercaseMsg.includes('quorum') ||
      lowercaseMsg.includes('could not connect to')
    ) {
      return new Error('Could not connect.');
    }
    if (lowercaseMsg.includes('call revert exception')) {
      return new Error('Possible bad token address.');
    }
    if (lowercaseMsg.includes('missing revert data')) {
      return new Error('Possible bad address.');
    }
    if (
      lowercaseMsg.includes(
        'transaction may fail or may require manual gas limit',
      )
    ) {
      return new Error(
        'Something went wrong. Please make sure you have a valid balance for this transaction.',
      );
    }
    if (lowercaseMsg.includes('replacement fee too low')) {
      return new Error(
        'Cancellation fee too low. Please increase your network fee to replace the current pending transaction.',
      );
    }
    if (lowercaseMsg.includes('intrinsic gas too low')) {
      return new Error(
        'Gas price rejected. Please select a higher gas price or resubmit.',
      );
    }
    if (lowercaseMsg.includes('insufficient funds for intrinsic')) {
      return new Error('Insufficient gas in signing wallet.');
    }
    if (lowercaseMsg.includes('nonce has already been used')) {
      return new Error(
        'Nonce previously used: this transaction is already completed.',
      );
    }
    if (lowercaseMsg.includes('Error while dialing dial tcp')) {
      return new Error('Error while dialing provider. Please try again.');
    }
    if (lowercaseMsg.includes('RailgunLogic: Invalid Merkle Root')) {
      return new Error(
        'RailgunLogic: Invalid Merkle Root. Please try re-scanning your balances through Settings.',
      );
    }
    return new Error(
      validAscii(err.message).replace(
        `:${STRING_PREFIX_AFTER_UNICODE_REPLACEMENT}`,
        ': ',
      ),
    );
  }

  return new Error('Unknown error. Please try again.');
};
