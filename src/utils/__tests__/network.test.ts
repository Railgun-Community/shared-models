import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { isHistoricalRelayAdaptContractAddress } from '../network';
import { NetworkName } from '../../models/network-config';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('network', () => {
  it('Should test historical relay adapt address', () => {
    expect(
      isHistoricalRelayAdaptContractAddress(NetworkName.Ethereum, ''),
    ).to.equal(false);
    expect(
      isHistoricalRelayAdaptContractAddress(
        NetworkName.Polygon,
        '0xc3f2C8F9d5F0705De706b1302B7a039e1e11aC88',
      ),
    ).to.equal(false);
    expect(
      isHistoricalRelayAdaptContractAddress(
        NetworkName.Ethereum,
        '0xC3F2C8F9d5F0705De706b1302B7a039e1e11aC88',
      ),
    ).to.equal(true);
  });
});
