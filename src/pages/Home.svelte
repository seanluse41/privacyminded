<script>
  import CardWrapper from "../components/CardWrapper.svelte";
  import { currentCategory } from "../stores/stores.js";
  import { onMount } from "svelte";

  let category;
  const unsubscribe = currentCategory.subscribe(value => {
    category = value;
  });

  function parallaxStart() {
    var elems = document.querySelectorAll(".parallax");
    var instances = M.Parallax.init(elems);
  }

  onMount(async () => {
    parallaxStart();
  });
</script>

<div class="parallax-container">
  <div class="parallax">
    <img src="img/parallax.jpg" />
  </div>
</div>
<div class="container">
  <h3 class="header center-align">Viewing: {category}</h3>
</div>
<CardWrapper />
