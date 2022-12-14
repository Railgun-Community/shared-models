import { Chain, ChainType } from './response-types';

export enum NetworkName {
  // Mainnets
  Railgun = 'Railgun',
  Ethereum = 'Ethereum',
  BNBChain = 'BNB_Chain',
  Polygon = 'Polygon',
  // Arbitrum = 'Arbitrum',

  // Testnets
  EthereumRopsten_DEPRECATED = 'Ethereum_Ropsten',
  EthereumGoerli = 'Ethereum_Goerli',
  PolygonMumbai = 'Polygon_Mumbai',
  ArbitrumGoerli = 'Arbitrum_Goerli',

  // Dev only
  Hardhat = 'Hardhat',
}

export type FeesSerialized = {
  shield: string;
  unshield: string;
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
  proxyContract: RailgunProxyContract;
  relayAdaptContract: RelayAdaptContract;
  deploymentBlock: RailgunProxyDeploymentBlock;
  isDevOnlyNetwork?: boolean;
  isTestnet?: boolean;
  defaultEVMGasType: EVMGasType;
  shouldQuickSync: boolean;
  deprecated?: boolean;
};

export enum RailgunProxyContract {
  Ethereum = '0xfa7093cdd9ee6932b4eb2c9e1cde7ce00b1fa4b9',
  BNBChain = '0x590162bf4b50f6576a459b75309ee21d92178a10',
  PolygonPOS = '0x19b620929f97b7b990801496c3b361ca5def8c71',

  // Test nets
  EthereumRopsten = '0x1c2A4092e2a436d78FcdF3a178a4E1ed87f0bB8F',
  EthereumGoerli = '0xe8bEa99BB438C2f3D533604D33258d74d5eE4824',
  PolygonMumbai = '0x3ee8306321d992483BDC9c69B8F622Ba3FFF05B6',
  ArbitrumGoerli = '0xA0603e598F9Ac2fc7475a3fA08D0794066615D9a',
  Hardhat = '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
}

export enum RelayAdaptContract {
  Ethereum = '0xc3f2C8F9d5F0705De706b1302B7a039e1e11aC88',
  BNBChain = '0x25f795A8eC8aF7904aa403fF2Cc7205ce683BF52',
  PolygonPOS = '0x969eE9AC1E0B5F5Dd781f63A168C52b73062ff86',

  // Test nets
  EthereumRopsten = '0x95abeff80554b23cefe1d3f8dcff3b7d90e28045',
  EthereumGoerli = '0x57F5925FeB79B1fd7Cc491F858D7fBc65502D3FE',
  PolygonMumbai = '0x80efF1a8939C9B6E8C61Ed5Be683Eda21088B7E6',
  ArbitrumGoerli = '0x7E77d890179Aa683ac2B9A608bd8121255CAa917',
  Hardhat = '0xc5a5C42992dECbae36851359345FE25997F5C42d',
}

export enum RailgunProxyDeploymentBlock {
  Ethereum = 14737691,
  BNBChain = 17633701,
  PolygonPOS = 28083766,

  // Test nets
  EthereumRopsten = 12226000,
  EthereumGoerli = 7795991,
  PolygonMumbai = 28697343,
  ArbitrumGoerli = 2611949,
  Hardhat = 0,
}

export enum BaseTokenWrappedAddress {
  EthereumWETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
  BinanceWBNB = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', // WBNB
  PolygonWMATIC = '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270', // WMATIC

  // Test nets
  EthereumRopstenWETH = '0xc778417e063141139fce010982780140aa0cd5ab', // (Ropsten) WETH
  EthereumGoerliWETH = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6', // (Goerli) WETH
  PolygonMumbaiWMATIC = '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889', // (Mumbai) WMATIC
  ArbitrumGoerliWETH = '0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3', // (Arbitrum Goerli) WETH
  HardhatWETH = '0x09635F643e140090A9A8Dcd712eD6285858ceBef', // (Hardhat) WETH
}

/**
 * Type0 / Type1 = non-EIP-1559 (gasPrice).
 * Type2 = EIP-1559 (maxFeePerGas and maxPriorityFeePerGas).
 */
export enum EVMGasType {
  Type0 = 0,
  Type1 = 1,
  Type2 = 2,
}

export const NETWORK_CONFIG: { [name in NetworkName]: Network } = {
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
    proxyContract: RailgunProxyContract.Ethereum,
    relayAdaptContract: RelayAdaptContract.Ethereum,
    deploymentBlock: RailgunProxyDeploymentBlock.Ethereum,
    defaultEVMGasType: EVMGasType.Type2,
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
    defaultEVMGasType: EVMGasType.Type2,
    shouldQuickSync: true,
  },
  [NetworkName.BNBChain]: {
    chain: {
      type: ChainType.EVM,
      id: 56,
    },
    name: NetworkName.BNBChain,
    publicName: 'BNB Smart Chain',
    shortPublicName: 'BSC',
    coingeckoId: 'binance-smart-chain',
    baseToken: {
      symbol: 'BNB',
      wrappedSymbol: 'WBNB',
      wrappedAddress: BaseTokenWrappedAddress.BinanceWBNB,
      decimals: 18,
    },
    proxyContract: RailgunProxyContract.BNBChain,
    relayAdaptContract: RelayAdaptContract.BNBChain,
    deploymentBlock: RailgunProxyDeploymentBlock.BNBChain,
    defaultEVMGasType: EVMGasType.Type0,
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
    defaultEVMGasType: EVMGasType.Type2,
    shouldQuickSync: true,
  },

  // TEST NETS
  [NetworkName.EthereumRopsten_DEPRECATED]: {
    deprecated: true,
    chain: {
      type: ChainType.EVM,
      id: 3,
    },
    name: NetworkName.EthereumRopsten_DEPRECATED,
    publicName: 'Ropsten Testnet',
    shortPublicName: 'Ropsten',
    coingeckoId: 'ethereum',
    baseToken: {
      symbol: 'ETH',
      wrappedSymbol: 'WETH',
      wrappedAddress: BaseTokenWrappedAddress.EthereumRopstenWETH,
      decimals: 18,
    },
    proxyContract: RailgunProxyContract.EthereumRopsten,
    relayAdaptContract: RelayAdaptContract.EthereumRopsten,
    deploymentBlock: RailgunProxyDeploymentBlock.EthereumRopsten,
    isDevOnlyNetwork: true,
    isTestnet: true,
    defaultEVMGasType: EVMGasType.Type2,
    shouldQuickSync: false,
  },
  [NetworkName.EthereumGoerli]: {
    chain: {
      type: ChainType.EVM,
      id: 5,
    },
    name: NetworkName.EthereumGoerli,
    publicName: 'G??rli Testnet',
    shortPublicName: 'G??rli',
    coingeckoId: 'ethereum',
    baseToken: {
      symbol: 'ETH',
      wrappedSymbol: 'WETH',
      wrappedAddress: BaseTokenWrappedAddress.EthereumGoerliWETH,
      decimals: 18,
    },
    proxyContract: RailgunProxyContract.EthereumGoerli,
    relayAdaptContract: RelayAdaptContract.EthereumGoerli,
    deploymentBlock: RailgunProxyDeploymentBlock.EthereumGoerli,
    isDevOnlyNetwork: true,
    isTestnet: true,
    defaultEVMGasType: EVMGasType.Type2,
    shouldQuickSync: true,
  },
  [NetworkName.PolygonMumbai]: {
    chain: {
      type: ChainType.EVM,
      id: 80001,
    },
    name: NetworkName.PolygonMumbai,
    publicName: 'Mumbai Testnet',
    shortPublicName: 'Mumbai',
    coingeckoId: 'polygon-pos',
    baseToken: {
      symbol: 'MATIC',
      wrappedSymbol: 'WMATIC',
      wrappedAddress: BaseTokenWrappedAddress.PolygonMumbaiWMATIC,
      decimals: 18,
    },
    proxyContract: RailgunProxyContract.PolygonMumbai,
    relayAdaptContract: RelayAdaptContract.PolygonMumbai,
    deploymentBlock: RailgunProxyDeploymentBlock.PolygonMumbai,
    isDevOnlyNetwork: true,
    isTestnet: true,
    defaultEVMGasType: EVMGasType.Type2,
    shouldQuickSync: true,
  },
  [NetworkName.ArbitrumGoerli]: {
    chain: {
      type: ChainType.EVM,
      id: 421613,
    },
    name: NetworkName.ArbitrumGoerli,
    publicName: 'Arbitrum G??rli Testnet',
    shortPublicName: 'Arbitrum G??rli',
    coingeckoId: 'arbitrum-one',
    baseToken: {
      symbol: 'ETH',
      wrappedSymbol: 'WETH',
      wrappedAddress: BaseTokenWrappedAddress.ArbitrumGoerliWETH,
      decimals: 18,
    },
    proxyContract: RailgunProxyContract.ArbitrumGoerli,
    relayAdaptContract: RelayAdaptContract.ArbitrumGoerli,
    deploymentBlock: RailgunProxyDeploymentBlock.ArbitrumGoerli,
    isDevOnlyNetwork: true,
    isTestnet: true,
    defaultEVMGasType: EVMGasType.Type2,
    shouldQuickSync: true,
  },
  [NetworkName.Hardhat]: {
    chain: {
      type: ChainType.EVM,
      id: 31337,
    },
    name: NetworkName.Hardhat,
    publicName: 'Hardhat Testnet',
    shortPublicName: 'Hardhat',
    coingeckoId: '',
    baseToken: {
      symbol: 'ETH',
      wrappedSymbol: 'WETH',
      wrappedAddress: BaseTokenWrappedAddress.HardhatWETH,
      decimals: 18,
    },
    proxyContract: RailgunProxyContract.Hardhat,
    relayAdaptContract: RelayAdaptContract.Hardhat,
    deploymentBlock: RailgunProxyDeploymentBlock.Hardhat,
    isDevOnlyNetwork: true,
    isTestnet: true,
    defaultEVMGasType: EVMGasType.Type2,
    shouldQuickSync: false,
  },
};

export const networkForChain = (chain: Chain): Optional<Network> => {
  return Object.values(NETWORK_CONFIG).find(
    network =>
      network.chain.type === chain.type && network.chain.id === chain.id,
  );
};
