<script>
  import { cart } from "../stores/stores.js";
  export let item;
  let { name, price, img, count } = item;

  const countButtonHandler = e => {
    if (e.target.classList.contains("add")) {
      count++;
    } else if (count >= 1) {
      count--;
    }
    cart.update(n => ({ ...n, [name]: { ...n[name], count } }));
  };

  const removeItem = () => {
    cart.update(n => {
      delete n[name];
      return n;
    });
  };
</script>

<style>
  .item-grid {
    display: flex;
  }

  .button-wrapper {
    display: flex;
    flex-direction: row;
  }

  .button-wrapper button {
    margin: 3%;
  }

  .meta-wrapper {
    display: flex;
    flex-direction: column;
    margin: 1%;
  }

  .count-wrapper {
    font-size: 2.5em;
    margin: 5% 5% 10% 5%;
    line-height: 100%;
  }

  img {
    width: 25%;
    height: 200px;
    object-fit: cover;
    margin: 10px 20px 10px 0;
  }

  @media screen and (max-width: 1048px) {
    img {
      width: 45%;
    }
  }

  @media screen and (max-width: 454px) {
    .item-grid {
      flex-direction: column;
    }

    img {
      width: 100%;
    }
  }
</style>

<div class="item-grid">
  <img src={`img/${img}`} alt={name} />
  <div class="meta-wrapper">
    <h4>{name}</h4>
    <span>{price}　￥</span>
  </div>
  <div class="button-wrapper">
    <div class="valign-wrapper">

      <button
        class="add waves-effect waves-light btn-small red darken-2"
        on:click={countButtonHandler}>
        <i class="material-icons">add</i>
      </button>
      <div class="count-wrapper">
        <span>{count}</span>
      </div>
      <button
        class="waves-effect waves-light btn-small red darken-2 remove"
        on:click={countButtonHandler}>
        <i class="material-icons">remove</i>
      </button>
      <button
        class="waves-effect waves-light btn-small red darken-2"
        on:click={removeItem}>
        <i class="material-icons">cancel</i>
      </button>
    </div>
  </div>
</div>
