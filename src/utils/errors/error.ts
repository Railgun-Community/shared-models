import { CustomErrorMapping, ErrorDefinition } from './types';
import { STRING_PREFIX_AFTER_UNICODE_REPLACEMENT, RAILGUN_ERRORS, CUSTOM_ERRORS, INVALID_ASCII_REGEX } from './constants';
import { isDefined } from '../util';

class CustomError extends Error {
  originalError: Error;

  constructor(message: string, originalError: Error) { 
    super(message);
    this.name = 'CustomError';
    this.originalError = originalError;
  }
}

class RailgunContractError extends Error {
  originalError: Error;

  constructor(message: string, originalError: Error) { 
    super(message);
    this.name = 'RailgunContractError';
    this.originalError = originalError;
  }
}

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
  if (isDefined(cause) && cause.message) {
    if (isRailgunError(cause)) {
      const matchedRailgunError = findMatchingError(cause.message, RAILGUN_ERRORS);
      if (matchedRailgunError) {
        return new RailgunContractError(matchedRailgunError.message, cause);
      }
      return new RailgunContractError('Uknown Railgun Smart Wallet Error.', cause);
    }

    const matchedCustomError = findMatchingError(cause.message, CUSTOM_ERRORS);

    if (matchedCustomError) {
      return new Error(matchedCustomError.message, cause);
    }

    // If no error is matched we return the original sanitized error
    const errorMessage = validAscii(cause.message).replace(
      `:${STRING_PREFIX_AFTER_UNICODE_REPLACEMENT}`,
      ': ',
    );

    return new CustomError(
      errorMessage,
      cause
    );
  }

  return new CustomError('Unknown error. Please try again.', cause);
};
