<script>
  import "../node_modules/materialize-css/dist/css/materialize.min.css";
  import "../node_modules/materialize-css/dist/js/materialize.min.js";

  import { Link } from "svelte-routing";
  import { Router, Route } from "svelte-routing";

  import CardWrapper from "./components/CardWrapper.svelte";
  import Navbar from "./components/Navbar.svelte";
  import Checkout from "./pages/Checkout.svelte";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";

  M.AutoInit();
</script>

<Router>
  <Navbar />
  <Route path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/checkout" component={Checkout} />
</Router>