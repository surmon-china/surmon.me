<script lang="ts" setup>
  import { onErrorCaptured } from 'vue'
  import { LanguageKey } from '/@/language'
  import { RouteName } from '/@/app/router'
  import { useEnhancer } from '/@/app/enhancer'
  import { getLayoutByRouteMeta } from '/@/transforms/layout'
  import ErrorComponent from './error.vue'

  const { router, gState } = useEnhancer()
  const handleResolveRoute = () => {
    router.push({ name: RouteName.Home }).then(() => {
      // MARK: The order is important! Layout must be set first, then rendered, thus avoiding splash screens!
      gState.setLayoutColumn(getLayoutByRouteMeta(router.currentRoute.value.meta))
      gState.setRenderError(null)
    })
  }

  onErrorCaptured((_error: any) => {
    gState.setRenderError(_error)
    return false
  })
</script>

<template>
  <div class="captured">
    <error-component
      v-if="gState.renderError.value"
      :error="gState.renderError.value"
      @resolve="handleResolveRoute"
    >
      <template #resolve-text>
        <i18n :k="LanguageKey.BACK_TO_HOME_PAGE" />
      </template>
    </error-component>
    <template v-else>
      <slot />
    </template>
  </div>
</template>
