export function tryDecodeURIComponent(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch (e) {
    console.error("Error decoding URI component:", e);
    return "";
  }
}
