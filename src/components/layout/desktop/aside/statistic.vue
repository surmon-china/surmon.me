<script lang="ts" setup>
  import { defineComponent, ref, h, onMounted, Transition } from 'vue'
  import { useNodepressStatisticStore } from '/@/stores/statistic'
  import { RouteName } from '/@/app/router'
  import { LanguageKey } from '/@/language'

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

  const fetching = ref(true)
  const statisticStore = useNodepressStatisticStore()

  onMounted(() => {
    statisticStore.fetch().finally(() => {
      fetching.value = false
    })
  })
</script>

<template>
  <router-link class="statistic" :to="{ name: RouteName.Archive }">
    <div class="item">
      <statistic-skeleton :fetching="fetching" :count="statisticStore.data?.articles" />
      <span class="title">
        <i18n :k="LanguageKey.STATISTIC_ARTICLES" />
      </span>
    </div>
    <divider type="vertical" />
    <div class="item">
      <statistic-skeleton :fetching="fetching" :count="statisticStore.data?.todayViews" />
      <span class="title">
        <i18n :k="LanguageKey.STATISTIC_TODAY_VIEWS" />
      </span>
    </div>
    <divider type="vertical" />
    <div class="item">
      <statistic-skeleton :fetching="fetching" :count="statisticStore.data?.comments" />
      <span class="title">
        <i18n :k="LanguageKey.STATISTIC_COMMENTS" />
      </span>
    </div>
  </router-link>
</template>

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
        animation: skeleton 0.8s linear alternate infinite;
      }

      .count {
        font-size: $font-size-h2;
        font-weight: bold;
        color: $text;
      }

      .title {
        font-size: $font-size-small - 2;
        white-space: nowrap;
        text-transform: uppercase;
        color: $text-secondary;
        @include color-transition();
      }
    }
  }
</style>
