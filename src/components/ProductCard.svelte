<script>
  import { get } from "svelte/store";
  import { cart } from "../stores/stores.js";
  export let item;
  let { img, name, price, sku } = item;
  img = `img/${img}`;
  const cartItems = get(cart);
  let inCart = cartItems[name] ? cartItems[name].count : 0;

function addToCart() {
    inCart++;
    cart.update(n => {
      return { ...n, [name]: { ...item, count: inCart } };
    });
    console.log(inCart);
    console.log(item);
  }

</script>

<style>

</style>

<div class="col s4">
  <div class="row">
    <div class="card hoverable">
      <div class="card-image">
        <img src={img} />
        <button
          class="btn-floating halfway-fab waves-effect waves-light red"
          on:click={addToCart}>
          <i class="material-icons">add_shopping_cart</i>
        </button>
      </div>
      <div class="card-content">
        <h5>{price}￥</h5>
        <p>{name}</p>
      </div>
    </div>
  </div>
</div>
