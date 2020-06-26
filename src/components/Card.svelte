<script>
  import { get } from "svelte/store";
  import { cart } from "../stores/stores.js";

  export let item;
  let { img, name, price } = item;
  img = `img/${img}`;

  const cartItems = get(cart);
  let inCart = cartItems[name] ? cartItems[name].count : 0;

  function addToCart() {
    inCart++;
    cart.update(n => {
      return { ...n, [name]: { ...item, count: inCart } };
    });
  }
</script>

<style>
  .item-card {
    align-self: stretch;
    justify-self: stretch;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 280px 0.4fr 0.4fr;
    column-gap: 10px;
    padding: 1em;
    font-size: 15px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  }

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    grid-column: 1/4;
    grid-row: 1;
  }

  .title {
    align-self: center;
    font-size: 1.3em;
    grid-column: 1/3;
    grid-row: 2;
  }

  .price {
    grid-column: 3;
    grid-row: 2;
    font-size: 1.2em;
    justify-self: end;
    align-self: center;
  }

  .button-group {
    grid-column: 1/4;
    grid-row: 3;
    display: flex;
    flex-direction: row-reverse;
    align-content: center;
  }

  .button-group span {
    align-self: center;
    color: rgba(0, 0, 0, 0.5);
    margin-left: 1em;
    font-size: 0.8em;
  }

  /* @media screen and (max-width: 880px){
    .button-group{

    }
  } */
</style>

<div class="item-card">
  <img src={img} alt={name} />
  <h3 class="title">{name}</h3>
  <p class="price">৳ {price}</p>
  <div class="button-group">
    <button on:click={addToCart} class="waves-effect waves-light red darken-2 btn">
      <i class="material-icons right">shopping_cart</i>
      Checkout
    </button>
    {#if inCart > 0}
      <span>
        <em>({inCart} in cart)</em>
      </span>
    {/if}
  </div>
</div>
