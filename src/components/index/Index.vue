<template>
  <div class="index">
    <carrousel :articles="articles"/>
    <archive/>
  </div>
</template>

<script>

  // import
  import Carrousel from './Carrousel.vue'
  import Archive from '../article/list/Archive.vue'

  // export
  export default {
    name: 'index',
    components: {
      Carrousel,
      Archive
    },
    computed: {
      articles() {
        return this.$store.state.article.list
      }
    }
  }
</script>
