import { Chain, ChainType, EVMGasType } from './response-types';

/**
 * DO NOT CHANGE THESE ENUM STRINGS.
 */
export enum NetworkName {
  // Mainnets
  Railgun = 'Railgun',
  Ethereum = 'Ethereum',
  BNBChain = 'BNB_Chain',
  Polygon = 'Polygon',
  Arbitrum = 'Arbitrum',

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
  relayAdaptHistory: string[];
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
  Arbitrum = '0xFA7093CDD9EE6932B4eb2c9e1cde7CE00B1FA4b9',

  // Test nets
  EthereumRopsten = '',
  EthereumGoerli = '0xe8bEa99BB438C2f3D533604D33258d74d5eE4824',
  PolygonMumbai = '0x3ee8306321d992483BDC9c69B8F622Ba3FFF05B6',
  ArbitrumGoerli = '0xA0603e598F9Ac2fc7475a3fA08D0794066615D9a',
  Hardhat = '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
}

export enum RelayAdaptContract {
  Ethereum = '0x4025ee6512DBbda97049Bcf5AA5D38C54aF6bE8a',
  BNBChain = '0x741936fb83DDf324636D3048b3E6bC800B8D9e12',
  PolygonPOS = '0xc7FfA542736321A3dd69246d73987566a5486968',
  Arbitrum = '0x5aD95C537b002770a39dea342c4bb2b68B1497aA',

  // Test nets
  EthereumRopsten = '',
  EthereumGoerli = '0x14a57CA7C5c1AD54fB6c642f428d973fcD696ED4',
  PolygonMumbai = '0x17D36875D723Cf0dA250d404Ef4cA0aABE105837',
  ArbitrumGoerli = '0x3eAf99B5EDc79D833AA8B6d18F0a8dd041e13eF6',
  Hardhat = '0x0355B7B8cb128fA5692729Ab3AAa199C1753f726',
}

export enum RailgunProxyDeploymentBlock {
  Ethereum = 14737691,
  BNBChain = 17633701,
  PolygonPOS = 28083766,
  Arbitrum = 56109834,

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
  ArbitrumWETH = '0x82af49447d8a07e3bd95bd0d56f35241523fbab1', // (Arbitrum) WETH

  // Test nets
  EthereumRopstenWETH = '0xc778417e063141139fce010982780140aa0cd5ab', // (Ropsten) WETH
  EthereumGoerliWETH = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6', // (Goerli) WETH
  PolygonMumbaiWMATIC = '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889', // (Mumbai) WMATIC
  ArbitrumGoerliWETH = '0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3', // (Arbitrum Goerli) WETH
  HardhatWETH = '0x09635F643e140090A9A8Dcd712eD6285858ceBef', // (Hardhat) WETH
}

export const NETWORK_CONFIG: Record<NetworkName, Network> = {
  [NetworkName.Railgun]: {
    chain: {
      type: ChainType.EVM,
      id: -1,
    },
    name: NetworkName.Railgun,
    publicName: 'RAILGUN',
    shortPublicName: '',
    coingeckoId: '',
    baseToken: {} as BaseToken,
    proxyContract: RailgunProxyContract.Ethereum,
    relayAdaptContract: RelayAdaptContract.Ethereum,
    relayAdaptHistory: [],
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
    relayAdaptHistory: [
      '0x22af4EDBeA3De885dDa8f0a0653E6209e44e5B84', // Initial deployment
      '0xc3f2C8F9d5F0705De706b1302B7a039e1e11aC88', // V3.0 Update - Nov 2022
      '0x4025ee6512DBbda97049Bcf5AA5D38C54aF6bE8a', // V3.1 Update - Jan 2023
    ],
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
    relayAdaptHistory: [
      '0x20d868C7F1Eb706C46641ADD2f849c5DBf4dB158', // Initial deployment
      '0x25f795A8eC8aF7904aa403fF2Cc7205ce683BF52', // V3.0 Update - Nov 2022
      '0x741936fb83DDf324636D3048b3E6bC800B8D9e12', // V3.1 Update - Jan 2023
    ],
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
    publicName: 'Polygon',
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
    relayAdaptHistory: [
      '0x30D8AD0339e2CF160620589f2DBa1765126A5fDC', // Initial deployment
      '0x969eE9AC1E0B5F5Dd781f63A168C52b73062ff86', // V3.0 Update - Nov 2022
      '0xc7FfA542736321A3dd69246d73987566a5486968', // V3.1 Update - Jan 2023
    ],
    deploymentBlock: RailgunProxyDeploymentBlock.PolygonPOS,
    defaultEVMGasType: EVMGasType.Type2,
    shouldQuickSync: true,
  },
  [NetworkName.Arbitrum]: {
    chain: {
      type: ChainType.EVM,
      id: 42161,
    },
    name: NetworkName.Arbitrum,
    publicName: 'Arbitrum',
    shortPublicName: 'Arbitrum',
    coingeckoId: 'arbitrum-one',
    baseToken: {
      symbol: 'ETH',
      wrappedSymbol: 'WETH',
      wrappedAddress: BaseTokenWrappedAddress.ArbitrumWETH,
      decimals: 18,
    },
    proxyContract: RailgunProxyContract.Arbitrum,
    relayAdaptContract: RelayAdaptContract.Arbitrum,
    relayAdaptHistory: [
      '0x5aD95C537b002770a39dea342c4bb2b68B1497aA', // Initial deployment - Feb 2023 post v3.1
    ],
    deploymentBlock: RailgunProxyDeploymentBlock.Arbitrum,
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
    relayAdaptHistory: [''],
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
    publicName: 'Görli Testnet',
    shortPublicName: 'Görli',
    coingeckoId: 'ethereum',
    baseToken: {
      symbol: 'ETH',
      wrappedSymbol: 'WETH',
      wrappedAddress: BaseTokenWrappedAddress.EthereumGoerliWETH,
      decimals: 18,
    },
    proxyContract: RailgunProxyContract.EthereumGoerli,
    relayAdaptContract: RelayAdaptContract.EthereumGoerli,
    relayAdaptHistory: [
      '0xD147B7Dfa636a1c50A52bF6A6FE910680274eE24', // Initial deployment
      '0x57F5925FeB79B1fd7Cc491F858D7fBc65502D3FE', // V3.0 Update - Nov 2022
      '0x6E9C59F042acB1577A297eDE607c21Ff284846F3', // V3.1 partial update - Jan 2023
      '0x14a57CA7C5c1AD54fB6c642f428d973fcD696ED4', // V3.1 Update - Jan 2023
    ],
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
    relayAdaptHistory: [
      '0x8B936B018CeA1c1cc14961CAdabD36E7fe9192cD', // Initial deployment
      '0x80efF1a8939C9B6E8C61Ed5Be683Eda21088B7E6', // V3.0 Update - Nov 2022
      '0x17D36875D723Cf0dA250d404Ef4cA0aABE105837', // V3.1 Update - Jan 2023
    ],
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
    publicName: 'Arbitrum Görli Testnet',
    shortPublicName: 'Arbitrum Görli',
    coingeckoId: 'arbitrum-one',
    baseToken: {
      symbol: 'ETH',
      wrappedSymbol: 'WETH',
      wrappedAddress: BaseTokenWrappedAddress.ArbitrumGoerliWETH,
      decimals: 18,
    },
    proxyContract: RailgunProxyContract.ArbitrumGoerli,
    relayAdaptContract: RelayAdaptContract.ArbitrumGoerli,
    relayAdaptHistory: [
      '0x7E77d890179Aa683ac2B9A608bd8121255CAa917', // Initial deployment (post v3.0)
      '0x3eAf99B5EDc79D833AA8B6d18F0a8dd041e13eF6', // V3.1 Update - Jan 2023
    ],
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
    relayAdaptHistory: [''],
    deploymentBlock: RailgunProxyDeploymentBlock.Hardhat,
    isDevOnlyNetwork: true,
    isTestnet: true,
    defaultEVMGasType: EVMGasType.Type2,
    shouldQuickSync: false,
  },
};
