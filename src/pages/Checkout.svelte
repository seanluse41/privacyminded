<script>
  import CheckoutItem from "../components/CheckoutItem.svelte";
  import { cart } from "../stores/stores.js";

  let cartItems = [];
  let finalCart = [];

  const unsubscribe = cart.subscribe(items => {
    cartItems = Object.values(items);
  });

  let stripe = Stripe("pk_test_N2Kfa6ezxQc8rld0adGzibAV00OLGaocEP");

  // Basic Checkout
  async function startCheckout() {
    console.log("checkout started");
    const { error } = await stripe.redirectToCheckout({
      lineItems: cartItems,
      mode: "payment",
      successUrl: "https://localhost:5000/success",
      cancelUrl: "https://localhost:5000/error"
    });

    if (error) {
      alert("our payment system is broken!");
    }
  }

  function testCheckout() {
    console.log(cartItems);
  }
</script>

<style>

</style>

<div class="container">
  <h1>My Cart</h1>
  {#if cartItems.length === 0}
    <p class="empty-message">Your cart is empty</p>
  {:else}
    {#each cartItems as item (item.name)}
      <CheckoutItem {item} />
    {/each}
    <button
      class="waves-effect waves-light btn-large red"
      on:click={testCheckout}>
      <i class="material-icons right">shopping_cart</i>
      Checkout
    </button>
  {/if}
</div>
