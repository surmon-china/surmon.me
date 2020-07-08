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

<script lang="ts">
  import { defineComponent, computed, CSSProperties } from 'vue'
  import SkeletonLine from './line.vue'

  export default defineComponent({
    name: 'SkeletonParagraph',
    components: {
      SkeletonLine
    },
    props: {
      lines: {
        type: Number,
        default: 1
      },
      width: {
        type: Number
      },
      height: {
        type: Number
      },
      align: {
        type: Boolean,
        default: false
      },
      lineHeight: {
        type: String,
        default: '1rem'
      }
    },
    setup(props) {
      const style = computed<CSSProperties>(() => ({
        ...(props.width && { width: props.width + 'px' }),
        ...(props.height && { height: props.height + 'px' })
      }))

      const getLineStyle = (index: number) => {
        const style: CSSProperties = {
          height: props.lineHeight,
          marginBottom: index === props.lines - 1
            ? '0'
            : `calc(${props.lineHeight} * 0.75)`
        }
        const position = index % 3
        if (position) {
          const margin = 15 * position
          style.width = `${100 - margin}%`
          style.marginLeft = props.align ? '0' : '6%'
        }
        return style
      }

      return {
        style,
        getLineStyle
      }
    }
  })
</script>
