<script>
  import { cart } from "../stores/stores.js";
  import { Link } from "svelte-routing";

  function mobileNav() {
    var elems = document.querySelectorAll(".sidenav");
    var instances = M.Sidenav.init(elems);
  }

  let cart_sum = 0;

  const unsubscribe = cart.subscribe(items => {
    const itemValues = Object.values(items);
    cart_sum = 0;
    itemValues.forEach(item => {
      cart_sum += item.count;
    });
  });
</script>

<nav>
  <div class="nav-wrapper red darken-2">
    <a
      href="#"
      data-target="mobile-demo"
      class="sidenav-trigger"
      on:click={mobileNav}>
      <i class="material-icons">menu</i>
    </a>
    <div class="container">
      <Link to="/">
        <span class="brand-logo">SECUME!</span>
      </Link>
      <ul id="nav-mobile" class="right hide-on-small-only">
        <li>
          <Link to="/">
            <i class="material-icons">home</i>
          </Link>
        </li>
        <li>
          <Link to="/about">
            <i class="material-icons">info</i>
          </Link>
        </li>
        <li>
          <Link to="/checkout">
            <i class="material-icons">shopping_cart</i>
          </Link>
        </li>

      </ul>
    </div>
  </div>
</nav>

<ul class="sidenav" id="mobile-demo">
  <li>
    <Link to="/">
      <i class="material-icons">home</i>
    </Link>
  </li>
  <li>
    <Link to="/about">
      <i class="material-icons">info</i>
    </Link>
  </li>
  <li>
    <Link to="/checkout">
      <i class="material-icons">shopping_cart</i>
    </Link>
  </li>

  <li>
    <a href="http://www.seanbase.com">www.seanbase.com</a>
  </li>
</ul>
