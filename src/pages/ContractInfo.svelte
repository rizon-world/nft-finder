<script lang="ts">
import { isValidContractAddress } from '../utils';
import { replace } from 'svelte-spa-router';
import contractAddress from '../stores/contractAddress';
import networkConfig from '../stores/networkConfig';
import { queryToContract } from '../utils/queries';
import Accordion from '../Components/Accordion.svelte';
import { ContractInfo } from '../interfaces/contract';
import CircularProgress from '@smui/circular-progress';

let isLoading = false;
// TODO: add type
let contractInfo = {
  address: '',
  name: '',
  symbol: '',
  totalSupply: 0,
  minter: '',
} as ContractInfo;

const network = networkConfig.network;
const { rest } = $network;

contractAddress.subscribe((value) => {
  if (value) {
    if (isValidContractAddress(value)) {
      isLoading = true;
      contractInfo.address = value;
      Promise.all([
        queryToContract({
          rest,
          contractAddress: value,
          inputQuery: 'contractInfo',
        }),
        queryToContract({
          rest,
          contractAddress: value,
          inputQuery: 'numTokens',
        }),
        queryToContract({
          rest,
          contractAddress: value,
          inputQuery: 'minter',
        }),
      ])
        .then((data) => {
          contractInfo = { ...contractInfo, ...data[0] };
          contractInfo.totalSupply = data[1].count;
          contractInfo.minter = data[2].minter;
        })
        .catch((err) => {
          replace('/404');
        })
        .finally(() => {
          isLoading = false;
        });
    } else {
      replace('/404');
    }
  } else {
    replace('/');
  }
});
</script>

<div>
  <!-- TODO: refactoring to grid component and nft viewer component -->
  {#if isLoading}
    <div style="display: flex; justify-content: center">
      <CircularProgress style="height: 32px; width: 32px;" indeterminate />
    </div>
  {:else}
    <Accordion contractInfo="{contractInfo}" />
  {/if}
</div>
