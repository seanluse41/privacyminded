<script>
  import CategoryCards from "./CategoryCards.svelte";
</script>

<style>
  .modal {
    position: fixed;
    top: 50%;
    max-height: 80%;
  }

</style>

<!-- Modal Structure -->
<div id="modal1" class="modal">
  <div class="modal-content">
  <CategoryCards />
  </div>

  <div class="modal-footer">
    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
  </div>
</div>
