export enum RailgunWalletBalanceBucket {
  Spendable = 'Spendable',
  ShieldBlocked = 'ShieldBlocked',
  ShieldPending = 'ShieldPending',
  TransactProofSubmitted = 'TransactProofSubmitted',
  MissingInternalPOI = 'MissingInternalPOI', // Change or DeFi interaction (Swap receipt)
  MissingExternalPOI = 'MissingExternalPOI',
}
