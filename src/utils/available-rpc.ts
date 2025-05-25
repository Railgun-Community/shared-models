/// <reference types="../types/global" />
import { JsonRpcProvider, Network, type Provider, WebSocketProvider } from 'ethers';
import { ProviderJson } from './provider';
import { getUpperBoundMedian } from './median';
import { promiseTimeout } from './promises';

type LogError = (err: string) => void;

const BLOCK_NUMBER_TIMEOUT_MS = 5000;

/**
 * Health checks ProviderJson inputs, and returns an array of available RPC providers.
 * Available means that they respond to getBlockNumber(), and they are +/- 100 blocks from the median.
 */
export const getAvailableProviderJSONs = async (
  chainId: number,
  providerJsons: ProviderJson[],
  logError: LogError,
): Promise<ProviderJson[]> => {
  const blockNumbers: Optional<number>[] = await Promise.all(
    providerJsons.map(
      async providerJson =>
        await getBlockNumber(chainId, providerJson.provider, logError),
    ),
  );

  const nonZeroBlockNumbers = blockNumbers.filter(
    blockNumber => blockNumber != null && blockNumber > 0,
  ) as number[];
  const medianBlockNumber = getUpperBoundMedian(nonZeroBlockNumbers);
  const lowerBoundRange = medianBlockNumber - 100;
  const upperBoundRange = medianBlockNumber + 100;

  return providerJsons.filter((providerJson, index) => {
    const blockNumber = blockNumbers[index];
    if (blockNumber == null) {
      logError(
        `RPC Health Check failed for ${providerJson.provider}: No Block Number`,
      );
      return false;
    }
    if (blockNumber < lowerBoundRange) {
      logError(
        `RPC Health Check failed for ${providerJson.provider}: Block Number -${
          medianBlockNumber - blockNumber
        } from median`,
      );
      return false;
    }
    if (blockNumber > upperBoundRange) {
      logError(
        `RPC Health Check failed for ${providerJson.provider}: Block Number +${
          blockNumber - medianBlockNumber
        } from median`,
      );
      return false;
    }
    return true;
  });
};

const getBlockNumber = async (
  chainId: number,
  provider: string,
  logError: LogError,
): Promise<Optional<number>> => {
  const network = Network.from(chainId);

  // Conditionally handle what type of provider is being passed
  let rpcProvider: Provider;
  if (provider.startsWith('wss')) {
    rpcProvider = new WebSocketProvider(provider, network, {
      staticNetwork: network, // Network is dictated in the RPC URL, will not change
    });
  } else {
    rpcProvider = new JsonRpcProvider(provider, network, {
      staticNetwork: network, // Network is dictated in the RPC URL, will not change
    });
  }

  try {
    const block = await promiseTimeout(
      rpcProvider.getBlock('latest'),
      BLOCK_NUMBER_TIMEOUT_MS,
    );
    if (block == null) {
      throw new Error('Block is null');
    }
    return block.number;
  } catch (cause) {
    if (!(cause instanceof Error)) {
      throw new Error('Non-error thrown from getBlockNumber', { cause });
    }
    rpcProvider.destroy();
    logError(cause.message);
    return undefined;
  }
};
