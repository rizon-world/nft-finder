import Axios from 'axios';
import { inputQueries } from '../constants/queries';
import { RestAndContractAddress } from 'src/interfaces/contract';
import ContractInfo from 'src/pages/ContractInfo.svelte';
import { prettyJSON, stoba } from './strings';

export async function queryToContract(params: RestAndContractAddress) {
  const { rest, contractAddress, inputQuery } = params;
  if (
    inputQuery == 'contractInfo' ||
    inputQuery == 'numTokens' ||
    inputQuery == 'minter'
  ) {
    return query({
      rest,
      contractAddress,
      inputQuery: inputQueries[inputQuery],
    });
  }
  return queryToContractWithParams(params);
}

export async function queryToContractWithParams({
  rest,
  contractAddress,
  inputQuery,
}: RestAndContractAddress) {
  return query({
    rest,
    contractAddress,
    inputQuery: stoba(prettyJSON(inputQuery)),
  });
}

export async function query({
  rest,
  contractAddress,
  inputQuery,
}: RestAndContractAddress): Promise<ContractInfo> {
  return Axios(
    rest + `/cosmwasm/wasm/v1/contract/${contractAddress}/smart/${inputQuery}`,
  ).then((r) => r.data.data);
}
