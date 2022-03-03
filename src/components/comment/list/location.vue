<template>
  <span class="location">
    <span v-if="emojiText" class="emoji">{{ emojiText }}</span>
    <i v-else class="iconfont icon-earth"></i>
    <span>{{ countryText }}</span>
    <span class="separator">•</span>
    <span class="city">{{ cityText }}</span>
  </span>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue'
  import { countryCodeToEmoji } from '/@/transforms/emoji'
  import { IPLocation } from '/@/stores/comment'

  const municipalitys: string[] = ['Shanghai', 'Beijing', 'Tianjin', 'Chongqing', 'Chungking']

  export default defineComponent({
    name: 'CommentItemLocation',
    props: {
      location: {
        type: Object as PropType<IPLocation>,
        required: true
      }
    },
    setup(props) {
      const countryText = computed(() => props.location.country_code || props.location.country)
      const emojiText = computed(() => countryCodeToEmoji(props.location.country_code))
      const cityText = computed(() => {
        if (props.location.country_code === 'CN') {
          if (municipalitys.includes(props.location.region)) {
            return props.location.region
          }
        }
        return props.location.city
      })

      return {
        emojiText,
        countryText,
        cityText
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .location {
    display: inline-flex;
    align-items: center;

    .iconfont {
      margin-right: $xs-gap;
    }

    .emoji {
      margin-right: $xs-gap;
      color: $text;
      font-size: 130%;
      opacity: 0.8;
    }

    .separator {
      margin: 0 3px;
    }
  }
</style>
