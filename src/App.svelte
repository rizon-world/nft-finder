<script lang="ts">
  import Router from "svelte-spa-router";
  import { wrap } from "svelte-spa-router/wrap";
  import Header from "./Components/Header.svelte";
  import Home from "./pages/Home.svelte";
  import NotFound from "./pages/NotFound.svelte";
</script>

<main>
  <Header />
  <container class="md:max-w-7xl text-center">
    <Router routes={{
      '/': Home,
      '/contract/:contractAddr': wrap({
        asyncComponent: () => import('./pages/ContractInfo.svelte'),
      }),
      '*': NotFound
    }} />
  </container>
</main>

<style lang="postcss">
  :root {
    --svelte-rgb: 255, 62, 0;
  }
</style>