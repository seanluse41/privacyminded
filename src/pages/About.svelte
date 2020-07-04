<script>
  import { fade, fly } from "svelte/transition";
</script>

<div class="container">
  <h1 in:fly={{ fly: 200, duration: 2000 }}>
    Privacy you forget you even had.
  </h1>
  <p>
    Privacy NOW aims to empower the average user to operate privately online if
    they so choose.
  </p>
  <p>
    Our philosophy is that a locked backdoor, even if only for use of the state,
    is still a backdoor and can be utilized by bad actors. To that effect, we
    only sell certain thinkpads in which the intel ME backdoor system has been
    neutured, Graphene OS supported phones, and Purism laptops with hardware
    kill switches.
  </p>
</div>
