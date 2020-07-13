<script>
  import { fade, fly } from "svelte/transition";
  import { onMount } from "svelte";

  function scrollSpy() {
    var elems = document.querySelectorAll(".scrollspy");
    var instances = M.ScrollSpy.init(elems);
  }

  function pushPin() {
    var elems = document.querySelectorAll(".pushpin");
    var instances = M.Pushpin.init(elems);
  }

  onMount(async () => {
    scrollSpy();
    pushPin();
  });
</script>

<div class="container">
  <h1 in:fly={{ fly: 200, duration: 2000 }}>
    Privacy you forget you even had.
  </h1>
  <div class="row">
    <div class="col s12 m9 l10">
      <div id="introduction" class="section scrollspy">
        <p>
          Privacy NOW aims to empower the average user to operate privately
          online if they so choose.
        </p>
        <p>
          Our philosophy is that a locked backdoor, even if only for use of the
          state, is still a backdoor and can be utilized by bad actors. To that
          effect, we only sell certain thinkpads in which the intel ME backdoor
          system has been neutured, Graphene OS supported phones, and Purism
          laptops with hardware kill switches.
        </p>
      </div>

      <div id="tech" class="section scrollspy">
        <p>
          The Intel Management Engine (Intel ME) is, in short, a small computer
          within your computer, which you as the user have no control over. It
          can connect to the internet, record and send data, and access all
          levels of your system, without your computer even being turned on. For
          a longer read, check
          <a
            href="https://itnext.io/the-computer-in-your-computer-the-intel-management-engine-cd8d5aaf6c55">
            here.
          </a>
        </p>
        <p>
          Intel ME, despite providing no benefits to the user, is installed on
          all modern intel processesors, and provides a backdoor to your
          property for, at best legal government authorities, and at worst,
          malicious actors seeking to use those backdoors. Privacy NOW's
          approach to this problem is two-fold:
        </p>
        <ol>
          <li>
            Supply computers with the Intel ME removed / disabled using the open
            source
            <a href="https://github.com/corna/me_cleaner">me_cleaner</a>
            project. The thinkpad x220 and x230 models are able to remove Intel
            ME, while being modern enough to provide a wonderful computing
            experience. Add to this the x220 and x230's ease of repair
            (cheapness and availability of parts) and you can see that "newer"
            does not always equal "better". Our thinkpads are upgraded with 16gb
            of ram, 256gb SSD, and an option 1080p display. The firmware is
            edited to allow 3rd party batteries, USB C charging, overclocked
            RAM. See our speed comparison video here.
          </li>
          <li>
            Act as a point of resale for the
            <a href="https://puri.sm/">Purism</a>
            brand of open source, privacy and security respecting laptops.
            Purism has their own modern approach to disabling Intel ME, detailed
            <a href="https://puri.sm/learn/intel-me/">here.</a>
            Purism is a trusted retailer advocating for privacy and security in
            the computing space. Designed from the hardware on up to respect you
            and your digital life, Purism is an excellent choice for FOSS
            enthusiasts.
          </li>
        </ol>
      </div>
    </div>
    <div class="col hide-on-small-only m3 l2">
      <ul class="section table-of-contents pushpin" style="top:100px;">
        <li>
          <a href="#introduction">Introduction</a>
        </li>
        <li>
          <a href="#tech">Digital Privacy</a>
        </li>
        <li>
          <a href="#wear">Wearable Privacy</a>
        </li>
      </ul>
    </div>
  </div>

  <div class="row">
    <div class="col s12 m9 l10">

      <div id="wear" class="section scrollspy">
        <h4>Privacy for YOU.</h4>
        <p>
          As the line between digital and real becomes less clear, true privacy
          consciousness must also include that your identity, location, and
          items can be digitized and profiled at any time. Our line of security
          conscious bags and apparel will help keep your identity safe, while
          looking great.
        </p>
      </div>
    </div>
  </div>
</div>
