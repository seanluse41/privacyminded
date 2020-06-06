<script>
  import { cart } from "../stores/stores.js";
  import { createEventDispatcher } from "svelte";
  import { navigate } from 'svelte-routing';

  const dispatch = createEventDispatcher();

  let cart_sum = 0;

  const unsubscribe = cart.subscribe(items => {
    const itemValues = Object.values(items);
    cart_sum = 0;
    itemValues.forEach(item => {
      cart_sum += item.count;
    });
  });

  function goToCheckout() {
    navigate('/checkout', {replace: true})
  }
</script>

<style>

</style>

<div class="fixed-action-btn">
  <button
    on:click={goToCheckout}
    class="btn-floating btn-large waves-effect waves-light red"
    style="margin-left: 20px; display: flex; flex-direction:right; color: white;
    font-size: 21px; padding-right: 8px;">
    <i class="material-icons">shopping_cart</i>
    {cart_sum}
  </button>
</div>
