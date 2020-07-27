<script>
  import { get } from "svelte/store";
  import { cart } from "../stores/stores.js";
  import { fly } from "svelte/transition";

  export let item;

  import Modal from "./Modal.svelte";

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

  function modalTrigger() {
    var elems = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elems);
  }
</script>

<style>
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }

  .title {
    font-size: 3.3vh;
    display: flex;
    flex-direction: row-reverse;
    margin-top: 2%;
    margin-bottom: 1%;
  }

  .price {
    font-size: 1.2em;
    display: flex;
    flex-direction: row-reverse;
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
</style>

<div class="card hoverable" in:fly={{ y: 200, duration: 2000 }}>
  <a class="modal-trigger" href="#modal1" on:click={modalTrigger}>
    <div class="card-image">
      <img src={img} alt={name} />
    </div>
    <div class="card-content" style="padding-top:0px;padding-bottom:10px;">
      <h3 class="title">{name}</h3>
      <p class="price">{price}￥</p>
      <div class="button-group">
        <button
          on:click={addToCart}
          class="waves-effect waves-light btn"
          style="background-color:#e60012;">
          <i class="material-icons right">add_shopping_cart</i>
          Add
        </button>
        {#if inCart > 0}
          <span class="badge">({inCart} in cart)</span>
        {/if}
      </div>
    </div>
</div>
