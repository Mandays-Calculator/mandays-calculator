export function toUpperCaseNames(str: string): string {
  const stri = str.toLowerCase();
  return stri.charAt(0).toUpperCase() + stri.slice(1);
}
