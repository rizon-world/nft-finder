<script lang="ts">
import Select, { Option } from '@smui/select';
import networkConfig from '../stores/networkConfig';
import { writable } from 'svelte/store';

let networks = ['mainnet', 'testnet'];
let value = writable('mainnet');
const { isMainnet } = networkConfig;

value.subscribe((val) => {
  if (val === 'mainnet') {
    isMainnet.set(true);
  } else {
    isMainnet.set(false);
  }
});
</script>

<div class="columns margins" style="justify-content: flex-start;">
  <div>
    <Select bind:value="{$value}" label="Select Menu">
      {#each networks as network}
        <Option value="{network}">{network}</Option>
      {/each}
    </Select>
  </div>
</div>
