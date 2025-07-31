export const CEP_REGEX = /^\d{5}-?\d{3}$/;

export function isValidCEP(value: string): boolean {
  return CEP_REGEX.test(value);
}