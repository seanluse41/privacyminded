<script>
  import { cart } from "../stores/stores.js";
  export let item;

  $: total = parseInt(count * price);

  let { name, price, img, count } = item;

  function increaseCount() {
    count++;
    cart.update(n => ({ ...n, [name]: { ...n[name], count } }));
  }

  function decreaseCount() {
    if (count > 1) {
      count--;
      cart.update(n => ({ ...n, [name]: { ...n[name], count } }));
    } else {
      removeItem();
    }
  }

  const removeItem = () => {
    cart.update(n => {
      delete n[name];
      return n;
    });
  };
</script>

<div class="container">
  <div class="card large">
    <div class="card-image">
      <img src={`img/${img}`} alt={name} />
    </div>
    <div class="card-action">
      <span class="card-title">{name}</span>
      <p>Price: ￥ {total}</p>
      <div class="row">
        <div class="remove">
          <button
            class="waves-effect waves-light btn red remove col s2"
            on:click={decreaseCount}>
            <i class="material-icons">remove</i>
          </button>
        </div>
        <div class="col s1" style="font-size: 24px;">{count}</div>
        <div class="add">
          <button
            class="waves-effect waves-light btn red add col s2"
            on:click={increaseCount}>
            <i class="material-icons">add</i>
          </button>
        </div>
        <div class="col s1" />
        <button
          class="waves-effect waves-light btn red col s2"
          on:click={removeItem}>
          <i class="material-icons">cancel</i>
        </button>
      </div>
    </div>
  </div>
</div>
