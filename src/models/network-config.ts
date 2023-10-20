import { Chain, ChainType, EVMGasType } from './response-types';

/**
 * DO NOT CHANGE THESE ENUM STRINGS.
 */
export enum NetworkName {
  Railgun = 'Railgun', // TODO: Remove this

  // Mainnets
  Ethereum = 'Ethereum',
  BNBChain = 'BNB_Chain',
  Polygon = 'Polygon',
  Arbitrum = 'Arbitrum',

  // Testnets
  EthereumGoerli = 'Ethereum_Goerli',
  EthereumSepolia = 'Ethereum_Sepolia',
  PolygonMumbai = 'Polygon_Mumbai',
  ArbitrumGoerli = 'Arbitrum_Goerli',

  // Dev only
  Hardhat = 'Hardhat',

  // Deprecated
  EthereumRopsten_DEPRECATED = 'Ethereum_Ropsten',
}

export type FeesSerialized = {
  shield: string;
  unshield: string;
  nft: string;
};

type BaseToken = {
  symbol: string;
  wrappedSymbol: string;
  wrappedAddress: string;
  decimals: number;
};

type POISettings = {
  launchBlock: number;
};

export type Network = {
  chain: Chain;
  name: NetworkName;
  publicName: string;
  shortPublicName: string;
  coingeckoId: string;
  baseToken: BaseToken;
  proxyContract: string;
  relayAdaptContract: string;
  relayAdaptHistory: string[];
  deploymentBlock: number;
  isDevOnlyNetwork?: boolean;
  isTestnet?: boolean;
  defaultEVMGasType: EVMGasType;
  shouldQuickSync: boolean;
  deprecated?: boolean;
  poi?: POISettings;
};

export const RailgunProxyContract: Record<NetworkName, string> = {
  [NetworkName.Railgun]: '',

  [NetworkName.Ethereum]: '0xfa7093cdd9ee6932b4eb2c9e1cde7ce00b1fa4b9',
  [NetworkName.BNBChain]: '0x590162bf4b50f6576a459b75309ee21d92178a10',
  [NetworkName.Polygon]: '0x19b620929f97b7b990801496c3b361ca5def8c71',
  [NetworkName.Arbitrum]: '0xFA7093CDD9EE6932B4eb2c9e1cde7CE00B1FA4b9',

  // Test nets
  [NetworkName.EthereumRopsten_DEPRECATED]: '',
  [NetworkName.EthereumGoerli]: '0xe8bEa99BB438C2f3D533604D33258d74d5eE4824',
  [NetworkName.EthereumSepolia]: '0x942D5026b421cf2705363A525897576cFAdA5964',
  [NetworkName.PolygonMumbai]: '0x3ee8306321d992483BDC9c69B8F622Ba3FFF05B6',
  [NetworkName.ArbitrumGoerli]: '0xA0603e598F9Ac2fc7475a3fA08D0794066615D9a',
  [NetworkName.Hardhat]: '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
};

export const RelayAdaptContract: Record<NetworkName, string> = {
  [NetworkName.Railgun]: '',

  [NetworkName.Ethereum]: '0x4025ee6512DBbda97049Bcf5AA5D38C54aF6bE8a',
  [NetworkName.BNBChain]: '0x741936fb83DDf324636D3048b3E6bC800B8D9e12',
  [NetworkName.Polygon]: '0xc7FfA542736321A3dd69246d73987566a5486968',
  [NetworkName.Arbitrum]: '0x5aD95C537b002770a39dea342c4bb2b68B1497aA',

  // Test nets
  [NetworkName.EthereumRopsten_DEPRECATED]: '',
  [NetworkName.EthereumGoerli]: '0x14a57CA7C5c1AD54fB6c642f428d973fcD696ED4',
  [NetworkName.EthereumSepolia]: '0xCc1C4D2B362c3a0Fb19f734A896A58C81A062dc8',
  [NetworkName.PolygonMumbai]: '0x17D36875D723Cf0dA250d404Ef4cA0aABE105837',
  [NetworkName.ArbitrumGoerli]: '0x3eAf99B5EDc79D833AA8B6d18F0a8dd041e13eF6',
  [NetworkName.Hardhat]: '0x0355B7B8cb128fA5692729Ab3AAa199C1753f726',
};

export const RailgunProxyDeploymentBlock: Record<NetworkName, number> = {
  [NetworkName.Ethereum]: 14737691,
  [NetworkName.BNBChain]: 17633701,
  [NetworkName.Polygon]: 28083766,
  [NetworkName.Arbitrum]: 56109834,

  // Test nets
  [NetworkName.EthereumRopsten_DEPRECATED]: 12226000,
  [NetworkName.EthereumGoerli]: 7795991,
  [NetworkName.EthereumSepolia]: 4495479,
  [NetworkName.PolygonMumbai]: 28697343,
  [NetworkName.ArbitrumGoerli]: 2611949,

  [NetworkName.Railgun]: 0,
  [NetworkName.Hardhat]: 0,
};

export const BaseTokenWrappedAddress: Record<NetworkName, string> = {
  [NetworkName.Railgun]: '',

  [NetworkName.Ethereum]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
  [NetworkName.BNBChain]: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', // WBNB
  [NetworkName.Polygon]: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270', // WMATIC
  [NetworkName.Arbitrum]: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1', // (Arbitrum) WETH

  // Test nets
  [NetworkName.EthereumRopsten_DEPRECATED]:
    '0xc778417e063141139fce010982780140aa0cd5ab', // (Ropsten) WETH
  [NetworkName.EthereumGoerli]: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6', // (Goerli) WETH
  [NetworkName.EthereumSepolia]: '0x97a36608DA67AF0A79e50cb6343f86F340B3b49e', // (Sepolia) WETH
  [NetworkName.PolygonMumbai]: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889', // (Mumbai) WMATIC
  [NetworkName.ArbitrumGoerli]: '0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3', // (Arbitrum Goerli) WETH
  [NetworkName.Hardhat]: '0x09635F643e140090A9A8Dcd712eD6285858ceBef', // (Hardhat) WETH
};

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
    proxyContract: RailgunProxyContract[NetworkName.Ethereum],
    relayAdaptContract: RelayAdaptContract[NetworkName.Ethereum],
    relayAdaptHistory: [],
    deploymentBlock: RailgunProxyDeploymentBlock[NetworkName.Ethereum],
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
      wrappedAddress: BaseTokenWrappedAddress[NetworkName.Ethereum],
      decimals: 18,
    },
    proxyContract: RailgunProxyContract[NetworkName.Ethereum],
    relayAdaptContract: RelayAdaptContract[NetworkName.Ethereum],
    relayAdaptHistory: [
      '0x22af4EDBeA3De885dDa8f0a0653E6209e44e5B84', // Initial deployment
      '0xc3f2C8F9d5F0705De706b1302B7a039e1e11aC88', // V3.0 Update - Nov 2022
      '0x4025ee6512DBbda97049Bcf5AA5D38C54aF6bE8a', // V3.1 Update - Jan 2023
    ],
    deploymentBlock: RailgunProxyDeploymentBlock[NetworkName.Ethereum],
    defaultEVMGasType: EVMGasType.Type2,
    shouldQuickSync: true,
    poi: {
      launchBlock: 18470420, // Oct 31, 2023 - ~9:45am ET
    },
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
      wrappedAddress: BaseTokenWrappedAddress[NetworkName.BNBChain],
      decimals: 18,
    },
    proxyContract: RailgunProxyContract[NetworkName.BNBChain],
    relayAdaptContract: RelayAdaptContract[NetworkName.BNBChain],
    relayAdaptHistory: [
      '0x20d868C7F1Eb706C46641ADD2f849c5DBf4dB158', // Initial deployment
      '0x25f795A8eC8aF7904aa403fF2Cc7205ce683BF52', // V3.0 Update - Nov 2022
      '0x741936fb83DDf324636D3048b3E6bC800B8D9e12', // V3.1 Update - Jan 2023
    ],
    deploymentBlock: RailgunProxyDeploymentBlock[NetworkName.BNBChain],
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
      wrappedAddress: BaseTokenWrappedAddress[NetworkName.Polygon],
      decimals: 18,
    },
    proxyContract: RailgunProxyContract[NetworkName.Polygon],
    relayAdaptContract: RelayAdaptContract[NetworkName.Polygon],
    relayAdaptHistory: [
      '0x30D8AD0339e2CF160620589f2DBa1765126A5fDC', // Initial deployment
      '0x969eE9AC1E0B5F5Dd781f63A168C52b73062ff86', // V3.0 Update - Nov 2022
      '0xc7FfA542736321A3dd69246d73987566a5486968', // V3.1 Update - Jan 2023
    ],
    deploymentBlock: RailgunProxyDeploymentBlock[NetworkName.Polygon],
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
      wrappedAddress: BaseTokenWrappedAddress[NetworkName.Arbitrum],
      decimals: 18,
    },
    proxyContract: RailgunProxyContract[NetworkName.Arbitrum],
    relayAdaptContract: RelayAdaptContract[NetworkName.Arbitrum],
    relayAdaptHistory: [
      '0x5aD95C537b002770a39dea342c4bb2b68B1497aA', // Initial deployment - Feb 2023 post v3.1
    ],
    deploymentBlock: RailgunProxyDeploymentBlock[NetworkName.Arbitrum],
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
      wrappedAddress:
        BaseTokenWrappedAddress[NetworkName.EthereumRopsten_DEPRECATED],
      decimals: 18,
    },
    proxyContract: RailgunProxyContract[NetworkName.EthereumRopsten_DEPRECATED],
    relayAdaptContract:
      RelayAdaptContract[NetworkName.EthereumRopsten_DEPRECATED],
    relayAdaptHistory: [''],
    deploymentBlock:
      RailgunProxyDeploymentBlock[NetworkName.EthereumRopsten_DEPRECATED],
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
      wrappedAddress: BaseTokenWrappedAddress[NetworkName.EthereumGoerli],
      decimals: 18,
    },
    proxyContract: RailgunProxyContract[NetworkName.EthereumGoerli],
    relayAdaptContract: RelayAdaptContract[NetworkName.EthereumGoerli],
    relayAdaptHistory: [
      '0xD147B7Dfa636a1c50A52bF6A6FE910680274eE24', // Initial deployment
      '0x57F5925FeB79B1fd7Cc491F858D7fBc65502D3FE', // V3.0 Update - Nov 2022
      '0x6E9C59F042acB1577A297eDE607c21Ff284846F3', // V3.1 partial update - Jan 2023
      '0x14a57CA7C5c1AD54fB6c642f428d973fcD696ED4', // V3.1 Update - Jan 2023
    ],
    deploymentBlock: RailgunProxyDeploymentBlock[NetworkName.EthereumGoerli],
    isTestnet: true,
    defaultEVMGasType: EVMGasType.Type2,
    shouldQuickSync: true,
    poi: {
      launchBlock: 9802000, // Oct 3, 2023
    },
  },
  [NetworkName.EthereumSepolia]: {
    chain: {
      type: ChainType.EVM,
      id: 11155111,
    },
    name: NetworkName.EthereumSepolia,
    publicName: 'Sepolia Testnet',
    shortPublicName: 'Sepolia',
    coingeckoId: 'ethereum',
    baseToken: {
      symbol: 'ETH',
      wrappedSymbol: 'WETH',
      wrappedAddress: BaseTokenWrappedAddress[NetworkName.EthereumSepolia],
      decimals: 18,
    },
    proxyContract: RailgunProxyContract[NetworkName.EthereumSepolia],
    relayAdaptContract: RelayAdaptContract[NetworkName.EthereumSepolia],
    relayAdaptHistory: [
      '0xCc1C4D2B362c3a0Fb19f734A896A58C81A062dc8', // Initial deployment - Oct 2023
    ],
    deploymentBlock: RailgunProxyDeploymentBlock[NetworkName.EthereumSepolia],
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
      wrappedAddress: BaseTokenWrappedAddress[NetworkName.PolygonMumbai],
      decimals: 18,
    },
    proxyContract: RailgunProxyContract[NetworkName.PolygonMumbai],
    relayAdaptContract: RelayAdaptContract[NetworkName.PolygonMumbai],
    relayAdaptHistory: [
      '0x8B936B018CeA1c1cc14961CAdabD36E7fe9192cD', // Initial deployment
      '0x80efF1a8939C9B6E8C61Ed5Be683Eda21088B7E6', // V3.0 Update - Nov 2022
      '0x17D36875D723Cf0dA250d404Ef4cA0aABE105837', // V3.1 Update - Jan 2023
    ],
    deploymentBlock: RailgunProxyDeploymentBlock[NetworkName.PolygonMumbai],
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
      wrappedAddress: BaseTokenWrappedAddress[NetworkName.ArbitrumGoerli],
      decimals: 18,
    },
    proxyContract: RailgunProxyContract[NetworkName.ArbitrumGoerli],
    relayAdaptContract: RelayAdaptContract[NetworkName.ArbitrumGoerli],
    relayAdaptHistory: [
      '0x7E77d890179Aa683ac2B9A608bd8121255CAa917', // Initial deployment (post v3.0)
      '0x3eAf99B5EDc79D833AA8B6d18F0a8dd041e13eF6', // V3.1 Update - Jan 2023
    ],
    deploymentBlock: RailgunProxyDeploymentBlock[NetworkName.ArbitrumGoerli],
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
      wrappedAddress: BaseTokenWrappedAddress[NetworkName.Hardhat],
      decimals: 18,
    },
    proxyContract: RailgunProxyContract[NetworkName.Hardhat],
    relayAdaptContract: RelayAdaptContract[NetworkName.Hardhat],
    relayAdaptHistory: [''],
    deploymentBlock: RailgunProxyDeploymentBlock[NetworkName.Hardhat],
    isDevOnlyNetwork: true,
    isTestnet: true,
    defaultEVMGasType: EVMGasType.Type2,
    shouldQuickSync: false,
  },
};
