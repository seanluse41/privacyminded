<script>
  import { setupI18n, isLocaleLoaded, locale } from "../services/i18n";
  import TranslateButton from "../components/TranslateButton.svelte";
  import CartButton from "../components/CartButton.svelte";
  import ProductCard from "../components/ProductCard.svelte";
  import CardWrapper from "../components/CardWrapper.svelte";
</script>

<TranslateButton
  value={$locale}
  on:locale-changed={e => setupI18n({ withLocale: e.detail })} />
<CartButton />

<div class="container" style="margin-top:10px;">
  <CardWrapper />
</div>
