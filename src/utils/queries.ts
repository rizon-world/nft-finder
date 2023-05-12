import Axios from 'axios';
import { inputQueries } from '../constants/queries';
import { RestAndContractAddress } from 'src/interfaces/contract';
import ContractInfo from 'src/pages/ContractInfo.svelte';

export async function queryToContract({
  rest,
  contractAddress,
  inputQuery,
}: RestAndContractAddress) {
  return query({
    rest,
    contractAddress,
    inputQuery: inputQueries[inputQuery],
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
