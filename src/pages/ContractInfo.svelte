<script lang="ts">
import { strings } from '../utils';
import { replace } from 'svelte-spa-router';
import contractAddress from '../stores/contractAddress';
import networkConfig from '../stores/networkConfig';
import { queries } from '../utils';
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

network.subscribe((val) => {
  if (rest !== val.rest) {
    replace('/');
  }
});

contractAddress.subscribe((value) => {
  if (value) {
    if (strings.isValidContractAddress(value)) {
      isLoading = true;
      contractInfo.address = value;
      Promise.all([
        queries.queryToContract({
          rest,
          contractAddress: value,
          inputQuery: 'contractInfo',
        }),
        queries.queryToContract({
          rest,
          contractAddress: value,
          inputQuery: 'numTokens',
        }),
        queries.queryToContract({
          rest,
          contractAddress: value,
          inputQuery: 'minter',
        }),
      ])
        .then((data) => {
          contractInfo = { ...contractInfo, ...data[0] };
          contractInfo.totalSupply = data[1].count;
          contractInfo.minter = data[2].minter;
          isLoading = false;
        })
        .catch((_) => {
          isLoading = false;
          replace('/404');
        });
    } else {
      replace('/404');
    }
  } else {
    replace('/');
  }
});
</script>

<!-- TODO: refactoring to grid component and nft viewer component -->
{#if isLoading}
  <div style="display: flex; justify-content: center">
    <CircularProgress style="height: 32px; width: 32px;" indeterminate />
  </div>
{:else}
  <Accordion contractInfo="{contractInfo}" />
{/if}
