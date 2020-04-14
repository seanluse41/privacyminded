<script>
  import "../node_modules/materialize-css/dist/css/materialize.min.css";
  import "../node_modules/materialize-css/dist/js/materialize.min.js";

  import { Router, Route } from "svelte-routing";
  import { setupI18n, isLocaleLoaded, locale } from "./services/i18n";
  import { derived } from "svelte/store";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Navbar from "./components/Navbar.svelte";

  $: if (!$isLocaleLoaded) {
    setupI18n({ withLocale: "jp" });
  }
</script>

{#if $isLocaleLoaded}
  <Router>
    <Navbar />
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
  </Router>
{:else}
  <p>Loading...</p>
{/if}
