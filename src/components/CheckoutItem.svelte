<script>
  import { cart } from "../stores/stores.js";
  export let item;
  let { name, price, img, count } = item;

  const addCount = () => {
    count++;
    cart.update(n => ({ ...n, [name]: { ...n[name], count } }));
  };

    const removeCount = () => {
    count--;
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
    background-color: lightgrey;
    margin-top: 5%;
    margin-bottom: 2%;
    margin-right: 8%;
    margin-left: 8%;
    padding: 2%;
  }

  .button-wrapper {
    display: flex;
    flex-direction: row;
  }

  .button-wrapper button {
    margin: 3%;
    display: flex;
    justify-content: center;
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

<div class="item-grid hoverable">
  <img src={`img/${img}`} alt={name} />
  <div class="meta-wrapper">
    <h4>{name}</h4>
    <span>{price}　￥</span>
    <div class="button-wrapper">
      <div class="valign-wrapper">
        <div class="add">
          <button
            class="waves-effect waves-light btn-small red darken-2"
            on:click={addCount}>
            <i class="material-icons">add</i>
          </button>
        </div>
        <div class="count-wrapper">
          <span>{count}</span>
        </div>
        <div class="remove">
          <button
            class="remove waves-effect waves-light btn-small red darken-2"
            on:click={removeCount}>
            <i class="material-icons center">remove</i>
          </button>
        </div>
        <button
          class="waves-effect waves-light btn-small red darken-2"
          on:click={removeItem}>
          <i class="material-icons center">cancel</i>
        </button>
      </div>
    </div>
  </div>
</div>
