<style lang="postcss">
:root {
  --svelte-rgb: 255, 62, 0;
}
</style>

<script lang="ts">
import Router from 'svelte-spa-router';
import { wrap } from 'svelte-spa-router/wrap';
import Header from './Components/Header.svelte';
import Home from './pages/Home.svelte';
import NotFound from './pages/NotFound.svelte';
</script>

<main>
  <Header />
  <container class="text-center md:max-w-7xl">
    <Router
      routes="{{
        '/': Home,
        '/contract/:contractAddr': wrap({
          asyncComponent: () => import('./pages/ContractInfo.svelte'),
        }),
        '*': NotFound,
      }}" />
  </container>
</main>
