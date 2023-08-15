<script lang="ts" setup>
  import { computed } from 'vue'
  import { countryCodeToEmoji } from '/@/transforms/emoji'
  import { IPLocation } from '/@/interfaces/comment'

  const props = defineProps<{
    location: IPLocation
  }>()

  const municipalitys: string[] = ['Shanghai', 'Beijing', 'Tianjin', 'Chongqing', 'Chungking']
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
</script>

<template>
  <span class="location">
    <span v-if="emojiText" class="emoji" :title="props.location.country">{{ emojiText }}</span>
    <i v-else class="iconfont icon-earth"></i>
    <span :title="props.location.country">{{ countryText }}</span>
    <span class="separator">•</span>
    <span :title="cityText">{{ cityText }}</span>
  </span>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .location {
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    &:hover {
      .emoji {
        color: $text;
      }
    }

    .iconfont {
      margin-right: $xs-gap;
    }

    .emoji {
      margin-right: $xs-gap;
      font-size: 130%;
    }

    .separator {
      margin: 0 3px;
    }
  }
</style>
