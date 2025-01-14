import { CustomErrorMapping, ErrorDefinition } from './types';
import { STRING_PREFIX_AFTER_UNICODE_REPLACEMENT, RAILGUN_ERRORS, CUSTOM_ERRORS, INVALID_ASCII_REGEX } from './constants';

const validAscii = (str: string) => {
  return str.replace(
    INVALID_ASCII_REGEX,
    '',
  );
};

const findMatchingError = (errorMessage: string, errorMapping: CustomErrorMapping): ErrorDefinition | null => {
  const lowercaseMsg = errorMessage.toLowerCase();
  
  for (const [, errorDef] of Object.entries(errorMapping)) {
    if (errorDef.matches.some(match => lowercaseMsg.includes(match))) {
      return errorDef;
    }
  }
  return null;
}

const isRailgunError = (cause: Error): boolean => cause.message.toLowerCase().includes('railgunsmartwallet')

export const sanitizeError = (cause: Error): Error => {
  if (!cause?.message) {
    return new Error('Unknown error. Please try again.', { cause });
  }

  if (isRailgunError(cause)) {
    const matchedRailgunError = findMatchingError(cause.message, RAILGUN_ERRORS);
    if (matchedRailgunError) {
      return new Error(matchedRailgunError.message, { cause });
    }
    return new Error('Uknown Railgun Smart Wallet Error.', { cause });
  }

  const matchedCustomError = findMatchingError(cause.message, CUSTOM_ERRORS);

  if (matchedCustomError) {
    return new Error(matchedCustomError.message, { cause });
  }

  // If no error is matched we return the original sanitized error
  const errorMessage = validAscii(cause.message).replace(
    `:${STRING_PREFIX_AFTER_UNICODE_REPLACEMENT}`,
    ': ',
  );

  return new Error(
    errorMessage,
    { cause }
  );
};
