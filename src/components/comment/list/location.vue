<template>
  <span class="location">
    <template v-if="emoji && emojiText">
      <span class="emoji">{{ emojiText }}</span>
    </template>
    <template v-else>
      <i class="iconfont icon-earth"></i>
      <span>{{ countryText }}</span>
      <span class="separator">•</span>
    </template>
    <span class="city">{{ cityText }}</span>
  </span>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue'
  import countryFlagEmoji from 'country-flag-emoji'
  import { IPLocation } from '/@/stores/comment'

  const municipalitys: string[] = ['Shanghai', 'Beijing', 'Tianjin', 'Chongqing', 'Chungking']

  export default defineComponent({
    name: 'CommentItemLocation',
    props: {
      location: {
        type: Object as PropType<IPLocation>,
        required: true
      },
      emoji: {
        type: Boolean,
        default: false
      }
    },
    setup(props) {
      const countryText = computed(() => props.location.country_code || props.location.country)
      const emojiText = computed(() => countryFlagEmoji.get(props.location.country_code)?.emoji)
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
    .iconfont {
      margin-right: $xs-gap;
    }

    .emoji {
      margin-right: $sm-gap;
      color: $text-secondary;
      font-size: $font-size-base;
    }

    .separator {
      margin: 0 3px;
    }
  }
</style>
