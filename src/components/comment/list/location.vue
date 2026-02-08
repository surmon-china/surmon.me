<script lang="ts" setup>
  import { computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { countryCodeToEmoji } from '/@/transforms/emoji'
  import { IPLocation } from '/@/interfaces/comment'

  const props = defineProps<{
    location: IPLocation
  }>()

  const { globalState } = useEnhancer()

  const municipalities: string[] = ['Shanghai', 'Beijing', 'Tianjin', 'Chongqing', 'Chungking']
  const countryText = computed(() => props.location.country_code || props.location.country)
  const countryEmoji = computed(() => countryCodeToEmoji(props.location.country_code))
  const cityText = computed(() => {
    if (props.location.country_code === 'CN') {
      if (municipalities.includes(props.location.region)) {
        return props.location.region
      }
    }
    return props.location.city
  })
</script>

<template>
  <span class="location">
    <span
      class="emoji"
      :class="{ safari: globalState.userAgent.isSafari }"
      :title="props.location.country"
      v-if="countryEmoji"
      >{{ countryEmoji }}</span
    >
    <i class="iconfont icon-earth" v-else></i>
    <span :title="props.location.country">{{ countryText }}</span>
    <span class="separator">•</span>
    <span :title="cityText">{{ cityText }}</span>
  </span>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .location {
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    &:hover {
      .emoji {
        filter: saturate(1) opacity(1);
      }
    }

    .emoji {
      margin-right: $gap-tiny;
      line-height: 1;
      color: initial;
      filter: saturate(0.7) opacity(0.7);
      transition: filter $motion-duration-fast;
      font-size: 17px;
      &.safari {
        font-size: 14px;
      }
    }

    .iconfont {
      margin-right: $gap-tiny;
    }

    .separator {
      margin: 0 3px;
    }
  }
</style>
