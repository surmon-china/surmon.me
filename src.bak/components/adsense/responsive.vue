<template>
  <Adsense
    :ins-class="insClass || ''"
    :ins-style="insStyle"
    data-ad-format="auto"
    data-ad-slot="7405264495"
    data-full-width-responsive="true"
  />
</template>

<script>
  export default {
    name: 'AdsenseResponsive',
    props: {
      insClass: String,
      insStyle: String
    }
  }
</script>
