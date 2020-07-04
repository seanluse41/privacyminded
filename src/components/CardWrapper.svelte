<script>
  import Card from "./Card.svelte";
  import items from "../items.js";
  import { currentCategory } from "../stores/stores.js";

  let category;

  const unsubscribe = currentCategory.subscribe(value => {
    category = value;
  });

  function testCategory() {
    console.log(category);
  }
</script>

<style>
  .grid {
    width: 70vw;
    margin: 10vh auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    justify-items: stretch;
  }

  @media screen and (max-width: 1600px) {
    .grid {
      width: 80vw;
    }
  }

  @media screen and (max-width: 1400px) {
    .grid {
      width: 90vw;
    }
  }

  @media screen and (max-width: 1200px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 800px) {
    .grid {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>

<section class="card-wrapper grid">
  {#each items as item}
    <Card {item} />
  {/each}
</section>

<button on:click={testCategory}>test</button>
