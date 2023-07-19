<script lang="ts" setup>
  import { computed, CSSProperties } from 'vue'
  import SkeletonLine from './line.vue'

  interface Props {
    lines?: number
    width?: number
    height?: number
    align?: boolean
    lineHeight?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    lines: 1,
    align: false,
    lineHeight: '1rem'
  })

  const style = computed<CSSProperties>(() => ({
    ...(props.width && { width: props.width + 'px' }),
    ...(props.height && { height: props.height + 'px' })
  }))

  const getLineStyle = (index: number) => {
    const style: CSSProperties = {
      height: props.lineHeight,
      marginBottom: index === props.lines - 1 ? '0' : `calc(${props.lineHeight} * 0.75)`
    }
    const position = index % 3
    if (position) {
      style.width = `${100 - 15 * position}%`
      style.marginLeft = props.align ? '0' : '6%'
    }
    return style
  }
</script>

<template>
  <div class="skeleton paragraph" :style="style">
    <skeleton-line
      v-for="(line, index) in lines"
      :key="index"
      :style="getLineStyle(index)"
      class="paragraph-line"
    />
  </div>
</template>
