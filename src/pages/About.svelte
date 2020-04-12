<script>
  import { setupI18n, isLocaleLoaded, locale } from "../services/i18n";
  import TranslateButton from "../components/TranslateButton.svelte";
</script>

<div class="container right-align" style="margin-top: 30px;">
  <TranslateButton
    value={$locale}
    on:locale-changed={e => setupI18n({ withLocale: e.detail })} />
</div>
