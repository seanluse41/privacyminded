<script>
  import Card from "./ProductCard.svelte";
  import items from "../services/products.js";
</script>

<style>
</style>

<div class="row">
  {#each items as item}
    <Card {item} />
  {/each}
</div>