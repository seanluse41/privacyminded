<script>
  import { currentCategory } from "../stores/stores.js";

  function changeCategory(selection) {
    currentCategory.update(n => selection);
  }
</script>

<style>
  .category-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: ". ." ". .";
  }

  .card {
    margin: 25px;
  }
</style>

<h4>Categories:</h4>
<div class="category-wrapper">
  <div
    class="card hoverable modal-close"
    on:click={() => changeCategory('tech')}>
    <div class="card-image">
      <img src="img/librem14.png" alt="TECH" />
    </div>
    <div class="card-content center-align" style="padding:0px;">
      <h4>TECH</h4>
    </div>
  </div>
  <div
    class="card hoverable modal-close"
    on:click={() => changeCategory('wear')}>
    <div class="card-image">
      <img src="img/apparel.jpeg" alt="WEAR" style="max-height:150px;" />
    </div>
    <div class="card-content center-align" style="padding:0px;">
      <h4>WEAR</h4>
    </div>
  </div>
  <div
    class="card hoverable modal-close"
    on:click={() => changeCategory('services')}>
    <div class="card-image">
      <img src="img/librem14.png" alt="SERVICES" />
    </div>
    <div class="card-content center-align" style="padding:0px;">
      <h4>SERVICES</h4>
    </div>
  </div>
  <div class="card hoverable modal-close">
    <div class="card-image">
      <img src="img/lockicon.png" alt="ABOUT" style="max-height:150px;" />
    </div>
    <div class="card-content center-align" style="padding:0px;">
      <h4>ABOUT</h4>
    </div>
  </div>
</div>
