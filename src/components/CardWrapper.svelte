<script>
  import Card from "./Card.svelte";
  import computers from "../computers.js";
  import parts from "../parts.js";
  import wears from "../wear.js";
  import services from "../services.js";

  import { currentCategory } from "../stores/stores.js";

  let category;

  const unsubscribe = currentCategory.subscribe(value => {
    category = value;
  });
</script>

<style>
  .grid {
    width: 70vw;
    margin: 10vh auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 5%;
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
    {#each computers as item}
      <Card {item} />
    {/each}
    {#each parts as item}
      <Card {item} />
    {/each}
    {#each wears as item}
      <Card {item} />
    {/each}
    {#each services as item}
      <Card {item} />
    {/each}
  </section>
{:else if category == 'tech'}
  <section class="card-wrapper grid">
    {#each computers as item}
      <Card {item} />
    {/each}
    {#each parts as item}
      <Card {item} />
    {/each}
  </section>
{:else if category == 'wear'}
  <section class="card-wrapper grid">
    {#each wears as item}
      <Card {item} />
    {/each}
  </section>
{:else if category == 'services'}
  <section class="card-wrapper grid">
    {#each services as item}
      <Card {item} />
    {/each}
  </section>
{/if}
