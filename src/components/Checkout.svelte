<script>
  import CheckoutItem from "./CheckoutItem.svelte";
  import { cart } from "../stores/stores.js";

  let checkedOut = false;

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
  .checkout-container {
    width: 70vw;
    margin: 10vh auto 0 auto;
    display: flex;
    flex-direction: column;
  }

  .empty-message {
    margin: 10px 0;
  }

  button.checkout {
    align-self: flex-start;
    padding: 5px 20px;
    margin: 20px 0;
    background: #20447d;
    color: white;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  @media screen and (max-width: 1600px) {
    .checkout-container {
      width: 80vw;
    }
  }

  @media screen and (max-width: 1400px) {
    .checkout-container {
      width: 90vw;
    }
  }

  @media screen and (max-width: 454px) {
    button.checkout {
      align-self: stretch;
    }
  }
</style>

<div class="checkout-container">
  <h1>My Cart</h1>
  {#if cartItems.length === 0}
    {#if checkedOut}
      <p class="empty-message">Thank you for shopping with us</p>
    {:else}
      <p class="empty-message">Your cart is empty</p>
    {/if}
  {:else}
    {#each cartItems as item (item.name)}
      <CheckoutItem {item} />
    {/each}
    <button class="checkout" on:click={startCheckout}>Checkout</button>
  {/if}
</div>
