import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {
  FallbackProviderJsonConfig,
  createFallbackProviderFromJsonConfig,
} from '../fallback-provider';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('available-rpc', () => {
  it('Should check fallback provider cascade', async () => {
    const config: FallbackProviderJsonConfig = {
      chainId: 1,
      providers: [
        {
          provider:
            'https://eth-mainnet.gateway.pokt.network/v1/lb/627a4b6e18e53a003a6b6c26',
          priority: 1,
          weight: 2,
          stallTimeout: 2500,
        },
        {
          provider: 'https://railwayapi.xyz/rpc/alchemy/eth-mainnet',
          priority: 2,
          weight: 1,
        },
        { provider: 'https://cloudflare-eth.com/', priority: 3, weight: 1 },
        { provider: 'https://rpc.ankr.com/eth', priority: 3, weight: 1 },
      ],
    };

    const fallbackProvider = createFallbackProviderFromJsonConfig(config);

    await fallbackProvider.getBlockNumber();
  }).timeout(5000);

  it('Should sort ascending and descending', () => {
    const allConfigs = [
      {
        priority: 3,
      },
      {
        priority: 1,
      },
      {
        priority: 2,
      },
    ];

    // Ascending
    allConfigs.sort((a, b) => a.priority - b.priority);
    expect(allConfigs.map(c => c.priority)).to.deep.equal([1, 2, 3]);

    // Descending
    allConfigs.sort((a, b) => b.priority - a.priority);
    expect(allConfigs.map(c => c.priority)).to.deep.equal([3, 2, 1]);
  });
});
