<script lang="ts" setup>
  import { ref, computed, watch, onMounted, CSSProperties } from 'vue'

  const props = defineProps({
    id: {
      required: true,
      type: String
    },
    width: {
      required: true,
      type: Number
    },
    height: {
      required: true,
      type: Number
    },
    blur: {
      type: Number,
      default: 0.2
    },
    contrast: {
      type: Number,
      default: 1.1
    }
  })

  const filterId = `liquid-glass-${props.id}`
  const wrapperStyle = computed<CSSProperties>(() => ({
    width: `${props.width}px`,
    height: `${props.height}px`,
    backdropFilter: `url(#${filterId}) blur(${props.blur}px) contrast(${props.contrast}) brightness(1.05) saturate(1.1)`
  }))

  const canvasElement = ref<HTMLCanvasElement>()
  const feImageElement = ref<SVGFEImageElement>()
  const feDisplacementMapElement = ref<SVGFEDisplacementMapElement>()

  // states
  const canvasDPI = ref(1)

  // utility functions
  const smoothStep = (a, b, t) => {
    t = Math.max(0, Math.min(1, (t - a) / (b - a)))
    return t * t * (3 - 2 * t)
  }

  const length = (x, y) => {
    return Math.sqrt(x * x + y * y)
  }

  const roundedRectSDF = (x, y, width, height, radius) => {
    const qx = Math.abs(x) - width + radius
    const qy = Math.abs(y) - height + radius
    return Math.min(Math.max(qx, qy), 0) + length(Math.max(qx, 0), Math.max(qy, 0)) - radius
  }

  // fragment shader function
  const fragment = (uv) => {
    const ix = uv.x - 0.5
    const iy = uv.y - 0.5
    const distanceToEdge = roundedRectSDF(ix, iy, 0.3, 0.2, 0.6)
    const displacement = smoothStep(0.8, 0, distanceToEdge - 0.15)
    const scaled = smoothStep(0, 1, displacement)
    return { type: 't', x: ix * scaled + 0.5, y: iy * scaled + 0.5 }
  }

  const updateShader = () => {
    if (!canvasElement.value || !feImageElement.value || !feDisplacementMapElement.value) return

    const w = Math.ceil(props.width * canvasDPI.value)
    const h = Math.ceil(props.height * canvasDPI.value)

    if (w <= 0 || h <= 0) return

    const dataSize = w * h * 4
    const data = new Uint8ClampedArray(dataSize)

    let maxScale = 0
    const rawValues: number[] = []

    for (let i = 0; i < dataSize; i += 4) {
      const x = (i / 4) % w
      const y = Math.ceil(i / 4 / w)
      const pos = fragment({ x: x / w, y: y / h })

      const dx = pos.x * w - x
      const dy = pos.y * h - y
      maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy))
      rawValues.push(dx, dy)
    }

    maxScale *= 0.5

    let index = 0
    for (let i = 0; i < data.length; i += 4) {
      const r = rawValues[index++] / maxScale + 0.5
      const g = rawValues[index++] / maxScale + 0.5
      data[i] = r * 255
      data[i + 1] = g * 255
      data[i + 2] = 0
      data[i + 3] = 255
    }

    const ctx = canvasElement.value.getContext('2d')!
    ctx.putImageData(new ImageData(data, w, h), 0, 0)
    feImageElement.value.setAttributeNS('http://www.w3.org/1999/xlink', 'href', canvasElement.value.toDataURL())
    feDisplacementMapElement.value.setAttribute('scale', (maxScale / canvasDPI.value).toString())
  }

  watch([() => props.width, () => props.height], () => {
    updateShader()
  })

  onMounted(() => {
    canvasDPI.value = window.devicePixelRatio || 1
    updateShader()
  })
</script>

<template>
  <div class="liquid-glass-wrapper" :style="wrapperStyle" data-allow-mismatch>
    <svg xmlns="http://www.w3.org/2000/svg" class="liquid-glass-svg" :width="0" :height="0">
      <defs>
        <filter
          :id="filterId"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
          :x="0"
          :y="0"
          :width="width"
          :height="height"
          data-allow-mismatch
        >
          <feImage
            :id="`${filterId}_map`"
            ref="feImageElement"
            :width="width"
            :height="height"
            data-allow-mismatch
          />
          <feDisplacementMap
            ref="feDisplacementMapElement"
            in="SourceGraphic"
            :in2="`${filterId}_map`"
            xChannelSelector="R"
            yChannelSelector="G"
            data-allow-mismatch
          />
        </filter>
      </defs>
    </svg>
    <canvas
      ref="canvasElement"
      class="liquid-glass-canvas"
      :width="width * canvasDPI"
      :height="height * canvasDPI"
    />
    <div class="liquid-glass-container">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .liquid-glass-wrapper {
    position: relative;

    .liquid-glass-svg {
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
    }

    .liquid-glass-canvas {
      display: none;
    }

    .liquid-glass-container {
      display: contents;
    }
  }
</style>
