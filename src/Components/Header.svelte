<style (lang="postcss" )>
.focus-none {
  outline: none;
  background-color: transparent;
  border-color: transparent;
}
.focus-on {
  border-color: rgba(98, 0, 238, 0.87);
}
form > button:hover {
  background-color: gray;
}
</style>

<script lang="ts">
import NetworkHandler from './NetworkHandler.svelte';
import logo from '../assets/rizon_logo.png';
import contractAddress from '../stores/contractAddress';
import { push, replace } from 'svelte-spa-router';
import { link } from 'svelte-spa-router';

let focused = false;

function handleFocus() {
  focused = !focused;
}

function handleChange(e: Event) {
  const { value } = e.target as HTMLSelectElement;
  contractAddress.set(value);
}

function handleSearch(e: Event) {
  e.preventDefault();
  contractAddress.subscribe((value) => {
    if (value) {
      push(`/contract/${value}`);
    } else {
      replace('/');
    }
  });
}
</script>

<header class="sticky top-0 border-b-2 border-gray-100 bg-white" style="z-index: 1;">
  <div class="mx-0 flex justify-between p-4 text-center">
    <a href="/" use:link>
      <img src="{logo}" alt="Svelte logo" class=" mx-2 w-16" />
    </a>
    <form
      class="{`mx-auto my-2 hidden w-1/2 flex-shrink justify-between rounded-md  border-2 border-solid border-gray-600 p-2 md:flex ${
        focused ? 'focus-on' : ''
      }`}"
      on:submit="{handleSearch}">
      <input
        type="text"
        name="search"
        class="focus-none mx-auto w-full"
        placeholder="Enter the contract address"
        on:focusin="{handleFocus}"
        on:focusout="{handleFocus}"
        on:change="{handleChange}" />
      <button class="my-auto px-1"
        ><i class="fa-solid fa-magnifying-glass"></i></button>
    </form>
    <NetworkHandler />
  </div>
  <div class="mx-0 p-4 text-center md:hidden">
    <form
      class="{`mx-auto my-2 flex w-full flex-shrink justify-between rounded-md  border-2 border-solid border-gray-600 p-2 ${
        focused ? 'focus-on' : ''
      }`}"
      on:submit="{(e) => e.preventDefault()}">
      <input
        type="text"
        class="focus-none mx-auto w-full"
        placeholder="Enter the contract address"
        on:focusin="{handleFocus}"
        on:focusout="{handleFocus}"
        on:change="{handleChange}" />
      <button class="my-auto px-1"
        ><i class="fa-solid fa-magnifying-glass"></i></button>
    </form>
  </div>
</header>
