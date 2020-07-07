<script>
  import CardWrapper from "../components/CardWrapper.svelte";
  import { currentCategory } from "../stores/stores.js";

  let category;
  const unsubscribe = currentCategory.subscribe(value => {
    category = value;
  });
</script>

<div class="container">
  <h4>Viewing: {category}</h4>
</div>
<CardWrapper />
