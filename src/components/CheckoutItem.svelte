<script>
  import { cart } from "../stores/stores.js";
  export let item;
  let { name, price, img, count } = item;

  const countButtonHandler = e => {
    if (e.target.classList.contains("add")) {
      count++;
    } else if (e.target.classlist.contains("remove")) {
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

<div class="container">
  <div class="card medium">
    <div class="card-image">
      <img src={`img/${img}`} alt={name} />
    </div>
    <h5>{name}</h5>
    <p>Price: ৳ {price}</p>
    <button
      class="waves-effect waves-light btn red remove"
      on:click={countButtonHandler}>
      <i class="material-icons">remove</i>
    </button>
    <button
      class="waves-effect waves-light btn red add"
      on:click={countButtonHandler}>
      <i class="material-icons">add</i>
    </button>
    <button class="waves-effect waves-light btn red" on:click={removeItem}>
      <i class="material-icons">cancel</i>
    </button>
  </div>
</div>
