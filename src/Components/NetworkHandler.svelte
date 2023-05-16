<script lang="ts">
import networkConfig from '../stores/networkConfig';
import { writable } from 'svelte/store';

let networks = ['mainnet', 'testnet'];
let value = writable('mainnet');
const { isMainnet } = networkConfig;

const storageNetwork = localStorage.getItem('network');
if (storageNetwork) {
  value.set(storageNetwork);
} else {
  value.set('mainnet');
  localStorage.setItem('network', 'mainnet');
}

value.subscribe((val) => {
  if (val === 'mainnet') {
    isMainnet.set(true);
    localStorage.setItem('network', 'mainnet');
  } else {
    isMainnet.set(false);
    localStorage.setItem('network', 'testnet');
  }
});
</script>

<div class="columns margins" style="justify-content: flex-start;">
  <select class="select-bordered select w-full max-w-xs" bind:value="{$value}">
    {#each networks as network}
      <option value="{network}">{network}</option>
    {/each}
  </select>
</div>
