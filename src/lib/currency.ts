export const MIN_DEPOSIT_BDT = 100;
export const MIN_WITHDRAW_BDT = 200;

export function formatBdt(amount: number) {
  return `৳${amount.toLocaleString("en-BD", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export const BD_MOBILE_PATTERN = /^01\d{9}$/;

export function isValidBdMobile(value: string) {
  return BD_MOBILE_PATTERN.test(value.trim());
}
