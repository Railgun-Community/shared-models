import { CustomErrorMapping } from "./types";

export const STRING_PREFIX_AFTER_UNICODE_REPLACEMENT = 'y %';

// eslint-disable-next-line no-useless-escape
export const INVALID_ASCII_REGEX = /[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g;

export const CUSTOM_ERRORS: CustomErrorMapping = {
  CONNECTION_ERROR: {
    matches: ['quorum', 'could not connect to'],
    message: 'Could not connect.'
  },
  RPC_ERROR: {
    matches: ['call revert exception', 'missing revert data', 'error while dialing dial tcp'],
    message: 'Failed to connect to RPC.'
  },
  KNOWN_TRANSACTION: {
    matches: ['already known'],
    message: 'Transaction successful but ethers request for TXID failed.'
  },
  LOW_REPLACEMENT_FEE: {
    matches: ['replacement fee too low'],
    message: 'Nonce is used in a pending transaction, and replacement fee is too low. Please increase your network fee to replace the pending transaction.'
  },
  LOW_GAS: {
    matches: ['intrinsic gas too low'],
    message: 'Gas price rejected. Please select a higher gas price or resubmit.'
  },
  UNDERPRICED_TRANSACTION: {
    matches: ['transaction underpriced'],
    message: 'Gas price rejected. Please select a higher gas price and resubmit.'
  }, // @@TODO: Find a better suited message for this
  INSUFFICIENT_GAS: {
    matches: ['insufficient funds for intrinsic'],
    message: 'Insufficient gas to process transaction.'
  },
  NONCE_USED: {
    matches: ['nonce has already been used'],
    message: 'Nonce already used: the transaction was already completed.'
  }, 
  LOW_PRIVATE_BALANCE: {
    matches: ['spendable private balance too low', 'broadcaster fee'],
    message: 'Private balance too low to pay broadcaster fee.'
  }
};

export const RAILGUN_ERRORS: CustomErrorMapping = {
  INVALID_NFT_NOTE: {
    matches: ['invalid nft note value'],
    message: 'RailgunSmartWallet: Invalid NFT Note Value.'
  },
  UNSUPPORTED_TOKEN: {
    matches: ['unsupported token'],
    message: 'RailgunSmartWallet: Unsupported Token. This token cannot interact with the RAILGUN contract.'
  },
  INVALID_NOTE_VALUE: {
    matches: ['invalid note value'],
    message: 'RailgunSmartWallet: Invalid Note Value. Please submit transaction with a corrected amount.'
  },
  INVALID_ADAPT_CONTRACT_SENDER: {
    matches: ['invalid adapt contract as sender'],
    message: 'RailgunSmartWallet: Invalid Adapt Contract as Sender. Please update your frontend to current Adapt module versions.'
  },
  INVALID_MERKLE_ROOT: {
    matches: ['invalid merkle root'],
    message: 'RailgunSmartWallet: Invalid Merkle Root. Please sync your balances and try again.'
  },
  NOTE_SPENT: {
    matches: ['note already spent'],
    message: 'RailgunSmartWallet: Note Already Spent. Please sync your balances and try again.'
  },
  INVALID_NOTE_CIPHERTEXT_ARRAY_LENGTH: {
    matches: ['invalid note ciphertext array length'],
    message: 'RailgunSmartWallet: Invalid Note Ciphertext Array Length. Please sync balances and re-prove your transaction.'
  },
  INVALID_WITHDRAW_NOTE: {
    matches: ['invalid withdraw note'],
    message: 'RailgunSmartWallet: Invalid Unshield Note. Please sync balances and re-prove your transaction.'
  },
  INVALID_SNARK_PROOF: {
    matches: ['invalid snark proof'],
    message: 'RailgunSmartWallet: Invalid Snark Proof. Please re-prove your transaction.'
  }
};
