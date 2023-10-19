export enum RailgunWalletBalanceBucket {
  Spendable = 'Spendable',
  ShieldBlocked = 'ShieldBlocked',
  ShieldPending = 'ShieldPending',
  ProofSubmitted = 'ProofSubmitted',
  MissingInternalPOI = 'MissingInternalPOI', // Change or DeFi interaction (Swap receipt)
  MissingExternalPOI = 'MissingExternalPOI',
  Spent = 'Spent', // ie. Unshield To Origin
}
