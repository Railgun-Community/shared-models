import { Chain, ChainType } from './response-types';

export enum NetworkName {
  Railgun = 'Railgun',
  Ethereum = 'Ethereum',
  BNBSmartChain = 'BNB_Chain',
  Polygon = 'Polygon',
  EthereumRopsten = 'Ethereum_Ropsten',
  EthereumGoerli = 'Ethereum_Goerli',

  // Test only
  HardHat = 'HardHat',
}

export enum BaseTokenWrappedAddress {
  EthereumWETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
  BinanceWBNB = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', // WBNB
  PolygonWMATIC = '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270', // WMATIC
  RopstenWETH = '0xc778417e063141139fce010982780140aa0cd5ab', // (Ropsten) WETH
  HardhatWETH = '0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44', // (Hardhat) WETH
}

export type FeesSerialized = {
  deposit: string;
  withdraw: string;
  nft: string;
};

type BaseToken = {
  symbol: string;
  wrappedSymbol: string;
  wrappedAddress: BaseTokenWrappedAddress;
  decimals: number;
};

export type Network = {
  chain: Chain;
  name: NetworkName;
  publicName: string;
  shortPublicName: string;
  coingeckoId: string;
  baseToken: BaseToken;
  proxyContract?: RailgunProxyContract;
  relayAdaptContract?: RelayAdaptContract;
  deploymentBlock?: RailgunProxyDeploymentBlock;
  isTestNetwork?: boolean;
  feesSerialized?: FeesSerialized;
  isEVM?: boolean;
  evmGasType: EVMGasType;
  shouldQuickSync: boolean;
};

enum RailgunProxyContract {
  Ethereum = '0xfa7093cdd9ee6932b4eb2c9e1cde7ce00b1fa4b9',
  Ropsten = '0x1c2A4092e2a436d78FcdF3a178a4E1ed87f0bB8F',
  BNBSmartChain = '0x590162bf4b50f6576a459b75309ee21d92178a10',
  PolygonPOS = '0x19b620929f97b7b990801496c3b361ca5def8c71',
  HardHat = '0x0165878A594ca255338adfa4d48449f69242Eb8F',
}

enum RelayAdaptContract {
  Ethereum = '0x22af4EDBeA3De885dDa8f0a0653E6209e44e5B84',
  Ropsten = '0x95abeff80554b23cefe1d3f8dcff3b7d90e28045',
  BNBSmartChain = '0x20d868C7F1Eb706C46641ADD2f849c5DBf4dB158',
  PolygonPOS = '0x30D8AD0339e2CF160620589f2DBa1765126A5fDC',
  HardHat = '0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f',
}

export enum RailgunProxyDeploymentBlock {
  Ethereum = 14737691,
  Ropsten = 12226000,
  BNBSmartChain = 17633701,
  PolygonPOS = 28083766,
  HardHat = 0,
}

/**
 * Type0 = non-EIP-1559 (gasPrice).
 * Type1 = EIP-1559 (maxFeePerGas and maxPriorityFeePerGas).
 */
export enum EVMGasType {
  Type0 = 'Type0',
  Type2 = 'Type2',
}

export const NETWORK_CONFIG: MapType<Network> = {
  [NetworkName.Railgun]: {
    chain: {
      type: -1,
      id: -1,
    },
    name: NetworkName.Railgun,
    publicName: 'RAILGUN',
    shortPublicName: '',
    coingeckoId: '',
    baseToken: {} as BaseToken,
    evmGasType: EVMGasType.Type2,
    shouldQuickSync: false,
  },
  [NetworkName.Ethereum]: {
    chain: {
      type: ChainType.EVM,
      id: 1,
    },
    name: NetworkName.Ethereum,
    publicName: 'Ethereum',
    shortPublicName: 'Ethereum',
    coingeckoId: 'ethereum',
    baseToken: {
      symbol: 'ETH',
      wrappedSymbol: 'WETH',
      wrappedAddress: BaseTokenWrappedAddress.EthereumWETH,
      decimals: 18,
    },
    proxyContract: RailgunProxyContract.Ethereum,
    relayAdaptContract: RelayAdaptContract.Ethereum,
    deploymentBlock: RailgunProxyDeploymentBlock.Ethereum,
    isEVM: true,
    evmGasType: EVMGasType.Type2,
    shouldQuickSync: true,
  },
  [NetworkName.BNBSmartChain]: {
    chain: {
      type: ChainType.EVM,
      id: 56,
    },
    name: NetworkName.BNBSmartChain,
    publicName: 'BNB Chain',
    shortPublicName: 'BSC',
    coingeckoId: 'binance-smart-chain',
    baseToken: {
      symbol: 'BNB',
      wrappedSymbol: 'WBNB',
      wrappedAddress: BaseTokenWrappedAddress.BinanceWBNB,
      decimals: 18,
    },
    proxyContract: RailgunProxyContract.BNBSmartChain,
    relayAdaptContract: RelayAdaptContract.BNBSmartChain,
    deploymentBlock: RailgunProxyDeploymentBlock.BNBSmartChain,
    isEVM: true,
    evmGasType: EVMGasType.Type0,
    shouldQuickSync: true,
  },
  [NetworkName.Polygon]: {
    chain: {
      type: ChainType.EVM,
      id: 137,
    },
    name: NetworkName.Polygon,
    publicName: 'Polygon PoS',
    shortPublicName: 'Polygon',
    coingeckoId: 'polygon-pos',
    baseToken: {
      symbol: 'MATIC',
      wrappedSymbol: 'WMATIC',
      wrappedAddress: BaseTokenWrappedAddress.PolygonWMATIC,
      decimals: 18,
    },
    proxyContract: RailgunProxyContract.PolygonPOS,
    relayAdaptContract: RelayAdaptContract.PolygonPOS,
    deploymentBlock: RailgunProxyDeploymentBlock.PolygonPOS,
    isEVM: true,
    evmGasType: EVMGasType.Type2,
    shouldQuickSync: true,
  },
  [NetworkName.EthereumRopsten]: {
    chain: {
      type: ChainType.EVM,
      id: 3,
    },
    name: NetworkName.EthereumRopsten,
    publicName: 'Ropsten Test Network',
    shortPublicName: 'Ropsten',
    coingeckoId: 'ethereum',
    baseToken: {
      symbol: 'ETH',
      wrappedSymbol: 'WETH',
      wrappedAddress: BaseTokenWrappedAddress.RopstenWETH,
      decimals: 18,
    },
    proxyContract: RailgunProxyContract.Ropsten,
    relayAdaptContract: RelayAdaptContract.Ropsten,
    deploymentBlock: RailgunProxyDeploymentBlock.Ropsten,
    isTestNetwork: true,
    isEVM: true,
    evmGasType: EVMGasType.Type2,
    shouldQuickSync: false,
  },
  // [NetworkName.EthereumGoerli]: {
  //   chainId: 420,
  //   name: NetworkName.EthereumGoerli,
  //   publicName: 'Goerli Test Network',
  //   shortPublicName: 'Goerli',
  //   coingeckoId: 'ethereum',
  //   baseToken: {
  //     symbol: 'ETH',
  //     wrappedSymbol: 'WETH',
  //     wrappedAddress: BaseTokenWrappedAddress.EthereumWETH, // TODO: Fix this address.
  //     decimals: 18,
  //   },
  //   proxyContract: '', // TODO: Add Goerli rail contract address.
  //   isTestNetwork: true,
  //   deploymentBlock: 0,
  //   isEVM: true,
  // },
  [NetworkName.HardHat]: {
    chain: {
      type: ChainType.EVM,
      id: 31337,
    },
    name: NetworkName.HardHat,
    publicName: 'HardHat Test Network',
    shortPublicName: 'HardHat',
    coingeckoId: '',
    baseToken: {
      symbol: 'ETH',
      wrappedSymbol: 'WETH',
      wrappedAddress: BaseTokenWrappedAddress.HardhatWETH,
      decimals: 18,
    },
    proxyContract: RailgunProxyContract.HardHat,
    relayAdaptContract: RelayAdaptContract.HardHat,
    deploymentBlock: RailgunProxyDeploymentBlock.HardHat,
    isTestNetwork: true,
    isEVM: true,
    evmGasType: EVMGasType.Type2,
    shouldQuickSync: false,
  },
};

export const networkForChain = (chain: Chain): Optional<Network> => {
  return Object.values(NETWORK_CONFIG).find(
    network =>
      network.chain.type === chain.type && network.chain.id === chain.id,
  );
};
