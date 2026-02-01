<script lang="ts" setup>
  import { defineComponent, ref, h, onMounted, Transition } from 'vue'
  import { useNodepressStatisticsStore } from '/@/stores/statistics'
  import { RouteName } from '/@/app/router'
  import { LocalesKey } from '/@/locales'

  const StatisticsSkeleton = defineComponent({
    props: {
      fetching: Boolean,
      count: Number
    },
    setup(props) {
      return () =>
        h(Transition, { name: 'module', mode: 'out-in', duration: 280 }, () =>
          props.fetching
            ? h('p', { class: 'skeleton', key: 'skeleton' }, '•••')
            : h('p', { class: 'count', key: 'count' }, props.count ?? '-')
        )
    }
  })

  const fetching = ref(true)
  const statisticStore = useNodepressStatisticsStore()

  onMounted(() => {
    statisticStore.fetch().finally(() => {
      fetching.value = false
    })
  })
</script>

<template>
  <router-link class="statistic" :to="{ name: RouteName.Archive }">
    <div class="item">
      <statistics-skeleton :fetching="fetching" :count="statisticStore.data?.articles" />
      <span class="label">
        <i18n :k="LocalesKey.STATISTIC_ARTICLES" />
      </span>
    </div>
    <divider type="vertical" size="sm" />
    <div class="item">
      <statistics-skeleton :fetching="fetching" :count="statisticStore.data?.todayViews" />
      <span class="label">
        <i18n :k="LocalesKey.STATISTIC_TODAY_VIEWS" />
      </span>
    </div>
    <divider type="vertical" size="sm" />
    <div class="item">
      <statistics-skeleton :fetching="fetching" :count="statisticStore.data?.comments" />
      <span class="label">
        <i18n :k="LocalesKey.STATISTIC_COMMENTS" />
      </span>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .statistic {
    width: 100%;
    height: 4.2rem;
    padding: $gap-xs;
    display: flex;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
    &:hover {
      .item {
        .count {
          color: $color-link;
        }
        .label {
          color: $color-text;
        }
      }
    }

    .item {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      flex: 1;

      .skeleton,
      .count {
        margin: 0;
        height: 2rem;
      }

      .skeleton {
        font-size: $font-size-h2;
        animation: skeleton 0.8s linear alternate infinite;
        @keyframes skeleton {
          from {
            color: $color-text-divider;
          }
          to {
            color: $color-link;
          }
        }
      }

      .count {
        font-size: $font-size-h2;
        font-weight: bold;
        color: $color-text;
      }

      .label {
        font-size: $font-size-quaternary;
        white-space: nowrap;
        text-transform: uppercase;
        color: $color-text-secondary;
        @include mix.color-transition();
      }
    }
  }
</style>
