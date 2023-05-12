export function isValidContractAddress(addr: string) {
  return (
    addr.length === 64 &&
    addr.startsWith('rizon') &&
    addr.slice(5).match(/^[0-9a-zA-Z]+$/)
  );
}

export function stoba(str: string) {
  return Buffer.from(str).toString('base64');
}
