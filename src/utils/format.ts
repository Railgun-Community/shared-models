export const decimalToHexString = (dec: string | number) => {
  return BigInt(dec).toString(16);
};
