<template>
  <router-link class="statistic" :to="{ name: RouteName.Archive }">
    <div class="item">
      <statistic-skeleton :fetching="fetching" :count="store.statistic?.articles" />
      <span class="title">
        <i18n :k="LanguageKey.STATISTIC_ARTICLES" />
      </span>
    </div>
    <divider type="vertical" />
    <div class="item">
      <statistic-skeleton :fetching="fetching" :count="store.statistic?.todayViews" />
      <span class="title">
        <i18n :k="LanguageKey.STATISTIC_TODAY_VIEWS" />
      </span>
    </div>
    <divider type="vertical" />
    <div class="item">
      <statistic-skeleton :fetching="fetching" :count="store.statistic?.comments" />
      <span class="title">
        <i18n :k="LanguageKey.STATISTIC_COMMENTS" />
      </span>
    </div>
  </router-link>
</template>

<script lang="ts">
  import { defineComponent, ref, h, onMounted, Transition } from 'vue'
  import { useStatisticStore } from '/@/stores/statistic'
  import { RouteName } from '/@/app/router'
  import { LanguageKey } from '/@/language'

  /* eslint-disable vue/one-component-per-file */
  const StatisticSkeleton = defineComponent({
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

  export default defineComponent({
    name: 'DesktopAsideStatistic',
    components: { StatisticSkeleton },
    setup() {
      const fetching = ref(true)
      const statisticStore = useStatisticStore()
      onMounted(() => {
        statisticStore.fetchStatistic().finally(() => {
          fetching.value = false
        })
      })

      return {
        LanguageKey,
        RouteName,
        fetching,
        store: statisticStore
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .statistic {
    width: 100%;
    height: 5em;
    padding: $sm-gap;
    display: flex;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
    &:hover {
      .item {
        .count {
          color: $link-color;
        }
        .title {
          color: $text;
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
        height: 2.8rem;
      }

      .skeleton {
        @keyframes skeleton {
          from {
            color: $text-divider;
          }
          to {
            color: $link-color;
          }
        }
        font-size: $font-size-h3;
        animation: skeleton-beccda1e 0.8s linear alternate infinite;
      }

      .count {
        font-size: $font-size-h2;
        font-weight: bold;
        color: $text;
      }

      .title {
        font-size: $font-size-small - 2;
        text-transform: uppercase;
        color: $text-secondary;
        @include color-transition();
      }
    }
  }
</style>
