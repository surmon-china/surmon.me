<template>
  <client-only>
    <Adsense
      :root-class="rootClass || 'mammon-box'"
      :ins-class="insClass"
      :ins-style="insStyle"
      :data-full-width-responsive="true"
      :is-non-personalized-ads="false"
      data-ad-client="ca-pub-4710915636313788"
      data-ad-slot="7405264495"
    />
  </client-only>
</template>

<script>
  export default {
    name: 'AdsenseResponsive',
    props: {
      insClass: String,
      rootClass: String,
      insStyle: String
    }
  }
</script>
