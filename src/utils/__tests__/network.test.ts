import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {
  isHistoricalRelayAdapt7702ContractAddress,
  isHistoricalRelayAdaptContractAddress,
} from '../network';
import { NETWORK_CONFIG, NetworkName } from '../../models/network-config';

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

  it('Should find current relay adapt contract in history for all networks', () => {
    Object.values(NETWORK_CONFIG).forEach(network => {
      if (network.deprecated == true || network.name === NetworkName.Hardhat) {
        return;
      }
      expect(
        isHistoricalRelayAdaptContractAddress(
          network.name,
          network.relayAdaptContract,
        ),
      ).to.equal(
        true,
        `Did not find current relay adapt contract in history for ${network.name}`,
      );
    });
  });

  it('Should test historical relay adapt 7702 address', () => {
    expect(
      isHistoricalRelayAdapt7702ContractAddress(NetworkName.Ethereum, ''),
    ).to.equal(false);
    expect(
      isHistoricalRelayAdapt7702ContractAddress(
        NetworkName.Polygon,
        '0x543acb4bb10512e57d689a101f0952b90bf1fa71',
      ),
    ).to.equal(false);
    expect(
      isHistoricalRelayAdapt7702ContractAddress(
        NetworkName.Ethereum,
        '0x543ACB4Bb10512E57d689A101f0952b90Bf1fA71',
      ),
    ).to.equal(true);
  });

  it('Should find current relay adapt 7702 contract in history for all supporting networks', () => {
    Object.values(NETWORK_CONFIG).forEach(network => {
      if (
        network.deprecated == true ||
        network.name === NetworkName.Hardhat ||
        !network.supports7702
      ) {
        return;
      }
      expect(
        isHistoricalRelayAdapt7702ContractAddress(
          network.name,
          network.relayAdapt7702Contract,
        ),
      ).to.equal(
        true,
        `Did not find current relay adapt 7702 contract in history for ${network.name}`,
      );
    });
  });
});
