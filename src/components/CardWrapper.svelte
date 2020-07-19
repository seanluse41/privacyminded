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
    var filteredList = items.filter(function(filter) {
      return filter.category == category;
    });
    console.log(filteredList);
    return filteredList;
  }
</script>

<style>
  .grid {
    width: 70vw;
    margin-left: 3%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2%;
    justify-items: stretch;
  }

  @media screen and (max-width: 1600px) {
    .grid {
      width: 70vw;
    }
  }

  @media screen and (max-width: 1400px) {
    .grid {
      width: 70vw;
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

{#if category == 'all'}
  <section class="card-wrapper grid">
    {#each items as item}
      <Card {item} />
    {/each}
  </section>
{:else if category == 'tech'}
  <section class="card-wrapper grid">
    {#each filteredItems as item}
      <Card {item} />
    {/each}
  </section>
{:else if category == 'wear'}
  <section class="card-wrapper grid">
    {#each filteredItems as item}
      <Card {item} />
    {/each}
  </section>
{:else if category == 'services'}
  <section class="card-wrapper grid">
    {#each filteredItems as item}
      <Card {item} />
    {/each}
  </section>
{/if}
<button on:click={testCategory}>test</button>
