<script>
  import CheckoutItem from "../components/CheckoutItem.svelte";
  import { cart } from "../stores/stores.js";

  let cartItems = [];
  const unsubscribe = cart.subscribe(items => {
    cartItems = Object.values(items);
  });
  let stripe = Stripe("pk_test_N2Kfa6ezxQc8rld0adGzibAV00OLGaocEP");

  // Basic Checkout
  async function startCheckout() {
    const finalCart = cartItems.map(({ sku, count }) => ({
      price: sku,
      quantity: count
    }));

    const { error } = await stripe.redirectToCheckout({
      lineItems: finalCart,
      mode: "payment",
      successUrl: "https://localhost:5000/success",
      cancelUrl: "https://localhost:5000/error"
    });

    if (error) {
      alert("our payment system is broken!");
    }
  }
</script>

<style>
  .empty-message {
    margin: 10px 0;
  }
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
      class="waves-effect waves-light btn-large red darken-2"
      on:click={startCheckout}>
      <i class="material-icons right">lock_outline</i>
      Checkout
    </button>
  {/if}
</div>
