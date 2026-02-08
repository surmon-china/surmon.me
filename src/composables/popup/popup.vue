<script lang="ts" setup>
  import { watch, watchEffect, Teleport } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { DEFAULT_POPUP_STATE } from './state'
  import { usePopup } from './'

  const props = defineProps({
    visible: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    bodyScrollable: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: DEFAULT_POPUP_STATE.maskClosable
    },
    scrollClosable: {
      type: Boolean,
      default: DEFAULT_POPUP_STATE.scrollClosable
    }
  })

  const emit = defineEmits<{
    (e: 'close'): void
    (e: 'update:visible', visible: boolean): void
  }>()

  const popup = usePopup()
  const { globalState } = useEnhancer()

  watch(
    // hidden modal via state
    () => popup.state.visible,
    (visible) => {
      if (!visible && props.visible) {
        emit('update:visible', false)
        emit('close')
      }
    }
  )

  watch(
    // hidden modal via props
    () => props.visible,
    (visible) => {
      visible
        ? popup.vModal({ maskClosable: props.maskClosable, scrollClosable: props.scrollClosable })
        : popup.hidden()
    }
  )

  // sync bodyScrollable state to global state
  watchEffect(() => {
    if (!props.bodyScrollable) {
      globalState.toggleSwitcher('bodyScrollable', !props.visible)
    }
  })
</script>

<template>
  <!-- https://vuejs.org/guide/built-ins/teleport.html -->
  <Teleport v-if="visible && popup.container.value" :to="popup.container.value">
    <div class="popup-modal" :class="{ border }"><slot /></div>
  </Teleport>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .popup-modal {
    @include mix.radius-box($radius-md);

    &.border {
      border: $gap-xs solid $module-bg-darker-1;
    }
  }
</style>
