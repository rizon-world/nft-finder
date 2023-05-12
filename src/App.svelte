<script lang="ts">
  import Router from "svelte-spa-router";
  import { wrap } from "svelte-spa-router/wrap";
  import Header from "./Components/Header.svelte";
  import Home from "./pages/Home.svelte";
  import NotFound from "./pages/NotFound.svelte";
</script>

<main>
  <Header />
  <Router routes={{
    '/': Home,
    '/contracts/:contractAddress': wrap({
      asyncComponent: () => import('./pages/ContractInfo.svelte'),
    }),
    '*': NotFound
  }} />
</main>

<style lang="postcss">
  :root {
    --svelte-rgb: 255, 62, 0;
  }
</style>