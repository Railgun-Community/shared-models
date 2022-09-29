import * as ArtifactModels from './models/artifact';
import * as BlockedAddressModels from './models/blocked-address';
import * as FallbackProviderModels from './models/fallback-provider';
import * as FeeTokenModels from './models/fee-token';
import * as FunctionTypesModels from './models/function-types';
import * as MerkletreeScanModels from './models/merkletree-scan';
import * as NetworkConfigModels from './models/network-config';
import * as ProofModels from './models/proof';
import * as ResponseTypesModels from './models/response-types';
import * as TransactionModels from './models/transaction';
import * as WalletModels from './models/wallet';

import * as CompareUtils from './utils/compare';
import * as ErrorUtils from './utils/error';
import * as GasUtils from './utils/gas';
import * as SerializerUtils from './utils/serializer';

export default {
  ...ArtifactModels,
  ...BlockedAddressModels,
  ...FallbackProviderModels,
  ...FeeTokenModels,
  ...FunctionTypesModels,
  ...MerkletreeScanModels,
  ...NetworkConfigModels,
  ...ProofModels,
  ...ResponseTypesModels,
  ...TransactionModels,
  ...WalletModels,

  ...CompareUtils,
  ...ErrorUtils,
  ...GasUtils,
  ...SerializerUtils,
};
