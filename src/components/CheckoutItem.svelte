<script>
  import { cart } from "../stores/stores.js";
  export let item;

  $: total = count * price;

  let { name, price, img, count } = item;

  const countButtonHandler = e => {
    if (e.target.classList.contains("add")) {
      count++;
    } else if (e.target.classlist.contains("remove")) {
      if (count == 1) {
        removeItem();
      } else {
        count--;
      }
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

<div class="container">
  <div class="card large">
    <div class="card-image">
      <img src={`img/${img}`} alt={name} />
    </div>
    <div class="card-action">
      <span class="card-title">{name}</span>
      <p>Price: ৳ {price * count}</p>
      <div class="row">
        <button
          class="waves-effect waves-light btn red remove col s2"
          on:click={count -= 1}>
          <i class="material-icons">remove</i>
        </button>
        <div class="col s1" style="font-size: 24px;">{count}</div>
        <button
          class="waves-effect waves-light btn red add col s2"
          on:click={count += 1}>
          <i class="material-icons">add</i>
        </button>
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
