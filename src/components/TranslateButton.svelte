<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let value = "en";
  function changeLanguage(event) {
    if (value == "en") {
      value = "jp";
    } else {
      value = "en";
    }
    dispatch("locale-changed", value);
  }
</script>
<div class="fixed-action-btn">
<button
  class="btn-floating btn-large waves-effect waves-light red"
  style="margin-left: 20px;"
  on:click={changeLanguage}>
  <i class="material-icons">g_translate</i>
</button>
</div>