<script lang="ts">
import networkConfig from '../stores/networkConfig';
import { writable } from 'svelte/store';

/**
 * If you want to add a mainnet, remove the comment from the mainnet line
 */
let networks = [
  // 'mainnet',
  'testnet'
];
let value = writable('testnet');
const { isMainnet } = networkConfig;

const storageNetwork = localStorage.getItem('network');
if (storageNetwork) {
  value.set(storageNetwork);
} else {
  value.set('testnet');
  localStorage.setItem('network', 'testnet');
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
