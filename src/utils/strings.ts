export function isValidContractAddress(addr: string) {
  return (
    addr &&
    addr.length === 64 &&
    addr.startsWith('rizon') &&
    addr.slice(5).match(/^[0-9a-zA-Z]+$/)
  );
}

export function isValidWalletAddress(addr: string) {
  return (
    addr &&
    addr.length === 44 &&
    addr.startsWith('rizon') &&
    addr.slice(5).match(/^[0-9a-zA-Z]+$/)
  );
}

export function stoba(str: string) {
  return Buffer.from(str).toString('base64');
}

export function prettyJSON(obj: any) {
  let str = JSON.stringify(obj, null, 2);
  // 줄바꿈 제거
  str = str.replace(/\r?\n|\r/g, '');

  // 공백 제거
  str = str.replaceAll(' ', '');
  return str;
}

export default {
  isValidContractAddress,
  stoba,
  prettyJSON,
};
