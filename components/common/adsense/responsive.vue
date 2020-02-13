<template>
  <div class="mammon-box responsive">
    <client-only>
      <Adsense
        :root-class="rootClass || 'mammon-wrapper'"
        :ins-class="insClass"
        :data-full-width-responsive="true"
        data-ad-client="ca-pub-4710915636313788"
        data-ad-slot="7405264495"
      />
    </client-only>
  </div>
</template>

<script>
  export default {
    name: 'AdsenseResponsive',
    props: {
      insClass: String,
      rootClass: String,
    }
  }
</script>

