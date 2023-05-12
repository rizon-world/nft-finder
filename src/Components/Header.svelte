<script lang="ts">
  import NetworkHandler from "./NetworkHandler.svelte";
  import logo from '../assets/rizon_logo.png';
  import contractAddress from "../stores/contractAddress";

  let focused = false;

  function handleFocus() {
    focused = !focused;
  }

  function handleChange(e: Event) {
    const { value } = e.target as HTMLSelectElement;
    contractAddress.set(value);
  }
</script>

<header class="sticky top-0 bg-white">
    <div class="text-center p-4 mx-0 flex justify-between">
      <div>
        <img src={logo} alt="Svelte logo" class=" w-16 mx-2" />
      </div>
      <form action="/contracts/" class={`w-1/2 mx-auto justify-between p-2 my-2 flex-shrink rounded-md  border-solid border-2 border-gray-600 md:flex hidden ${focused ? "focus-on" : ""}`} on:submit={(e) => e.preventDefault()} >
          <input type="text" name="search" class="w-full mx-auto focus-none" placeholder="Enter the contract address" on:focusin={handleFocus} on:focusout={handleFocus} on:change={handleChange} />
          <button class="my-auto px-1"><i class="fa-solid fa-magnifying-glass"></i></button>
      </form>
      <NetworkHandler />
    </div>
    <div class="text-center p-4 mx-0">
      <form class={`w-full mx-auto justify-between p-2 my-2 flex-shrink rounded-md  border-solid border-2 border-gray-600 md:hidden flex ${focused ? "focus-on" : ""}`} on:submit={(e) => e.preventDefault()} >
        <input type="text" class="w-full mx-auto focus-none" placeholder="Enter the contract address"  on:focusin={handleFocus} on:focusout={handleFocus} on:change={handleChange} />
        <button class="my-auto px-1"><i class="fa-solid fa-magnifying-glass"></i></button>
      </form>
    </div>
  </header>

  <style (lang="postcss")>
    .focus-none {
    outline: none;
    background-color: transparent;
    border-color: transparent;
    }
    .focus-on {
        border-color: rgba(98,0,238,.87);
    }
    form > button:hover {
        background-color: gray;
    }
  </style>