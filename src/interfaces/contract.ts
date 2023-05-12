export interface RestAndContractAddress {
  rest: string;
  contractAddress: string;
  inputQuery?: string;
}

export interface ContractInfo {
  name: string;
  symbol: string;
  count?: number;
}
