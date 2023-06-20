import { isDefined } from './util';

export const versionCompare = (
  appVersion?: string,
  minVersion?: string,
): number => {
  if (!isDefined(appVersion) || !isDefined(minVersion)) {
    throw new Error('Requires two version numbers to compare.');
  }

  // Adapted from https://stackoverflow.com/a/6832721
  const zeroExtend = true,
    v1parts = appVersion.split('.'),
    v2parts = minVersion.split('.');

  function isValidPart(x: string) {
    return /^\d+$/.test(x);
  }

  if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
    return NaN;
  }
  if (zeroExtend) {
    while (v1parts.length < v2parts.length) {
      v1parts.push('0');
    }
    while (v2parts.length < v1parts.length) {
      v2parts.push('0');
    }
  }

  const v1parts_number = v1parts.map(Number);
  const v2parts_number = v2parts.map(Number);

  for (let i = 0; i < v1parts_number.length; ++i) {
    if (v2parts_number.length === i) {
      return 1;
    }
    if (v1parts_number[i] === v2parts_number[i]) {
      continue;
    } else if (v1parts_number[i] > v2parts_number[i]) {
      return 1;
    } else {
      return -1;
    }
  }
  if (v1parts_number.length !== v2parts_number.length) {
    return -1;
  }
  return 0;
};
