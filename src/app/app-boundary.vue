<script lang="ts" setup>
  import { onErrorCaptured } from 'vue'
  import { LanguageKey } from '/@/language'
  import { RouteName } from '/@/app/router'
  import { useEnhancer } from '/@/app/enhancer'
  import { getLayoutByRouteMeta } from '/@/transforms/layout'
  import AppError from './app-error.vue'

  const { router, globalState } = useEnhancer()
  const handleResolveRoute = () => {
    router.push({ name: RouteName.Home }).then(() => {
      // MARK: The order is important! Layout must be set first, then rendered, thus avoiding splash screens!
      globalState.setLayoutColumn(getLayoutByRouteMeta(router.currentRoute.value.meta))
      globalState.setRenderError(null)
    })
  }

  onErrorCaptured((error: any) => {
    globalState.setRenderError(error)
    return false
  })
</script>

<template>
  <div class="app-boundary">
    <app-error
      v-if="globalState.renderError.value"
      :error="globalState.renderError.value"
      @resolve="handleResolveRoute"
    >
      <template #resolve-text>
        <i18n :k="LanguageKey.BACK_TO_HOME_PAGE" />
      </template>
    </app-error>
    <template v-else>
      <slot />
    </template>
  </div>
</template>
