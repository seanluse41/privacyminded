<script>
  import { Link } from "svelte-routing";
  import { _ } from "../services/i18n";
</script>

<style>


/* #e60012
#2b303a
#e0fbfc
#eae8ff
#d8d5db */

</style>

<nav>
  <div class="nav-wrapper">
    <a
      href="#"
      data-target="mobile-demo"
      class="sidenav-trigger">
      <i class="material-icons">menu</i>
    </a>
    <div class="container">
      <Link to="/">
        <span class="brand-logo">Template</span>
      </Link>
      <ul id="nav-mobile" class="right hide-on-small-only">
        <li>
          <Link to="/">{$_('navigate-home')}</Link>
        </li>
        <li>
          <Link to="/about">{$_('navigate-about')}</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

<ul class="sidenav" id="mobile-demo">
  <li>
    <Link to="/">{$_('navigate-home')}</Link>
  </li>
  <li>
    <Link to="/about">{$_('navigate-about')}</Link>
  </li>
  <li>
    <a href="http://www.seanbase.com">www.seanbase.com</a>
  </li>
</ul>