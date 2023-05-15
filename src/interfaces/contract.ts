export interface RestAndContractAddress {
  rest: string;
  contractAddress: string;
  inputQuery?: string;
}

export interface ContractInfo {
  address: string;
  name: string;
  symbol: string;
  minter?: string;
  totalSupply?: number;
}
