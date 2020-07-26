<script>
  import { cart } from "../stores/stores.js";
  import { Link } from "svelte-routing";

  import Modal from "./Modal.svelte";

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

  function modalTrigger() {
    var elems = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elems);
  }
</script>

<nav>
  <div class="nav-wrapper" style="background-color:#3c3c3b;">
    <a
      href="#"
      data-target="mobile-demo"
      class="sidenav-trigger"
      on:click={mobileNav}>
      <i class="material-icons">menu</i>
    </a>
    <div class="container">
      <Link to="/">
        <span class="brand-logo">Privacy Pasokon</span>
      </Link>
      <ul id="nav-mobile" class="right hide-on-small-only">
        <li>
          <Link to="/">
            <i class="material-icons">home</i>
          </Link>
        </li>
        <li>
          <a class="modal-trigger" href="#modal1" on:click={modalTrigger}>
            <i class="material-icons">apps</i>
          </a>
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
      <span>Home</span>
      <i class="material-icons">home</i>
    </Link>
  </li>

  <li>
    <a class="modal-trigger" href="#modal1" on:click={modalTrigger}>
      <i class="material-icons">apps</i>
      <span>Products</span>
    </a>
  </li>
  <li>
    <Link to="/about">
      <span>About</span>
      <i class="material-icons">info</i>
    </Link>
  </li>
  <li>
    <Link to="/checkout">
      <span>Cart</span>
      <i class="material-icons">shopping_cart</i>
    </Link>
  </li>

  <li>
    <a href="http://www.seanbase.com">www.seanbase.com</a>
  </li>
</ul>

<div class="modal1">
  <Modal />
</div>
