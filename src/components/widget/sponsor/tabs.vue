<template>
  <div class="sponsor-tabs" :class="activeId">
    <template v-for="(provider, index) in providers" :key="index">
      <button
        class="item"
        :class="[provider.id, { active: activeId === provider.id }]"
        :title="provider.title"
        @click="handleSwitch(provider.id)"
      >
        <span class="logo">
          <uimage class="image" :alt="provider.title" :src="provider.logo" cdn />
        </span>
        <span class="title" v-if="!hideTitle">{{ provider.title }}</span>
      </button>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { providers, SponsorState } from './state'
  export default defineComponent({
    name: 'SponsorTabs',
    props: {
      state: {
        type: Object as PropType<SponsorState>,
        required: true
      },
      hideTitle: {
        type: Boolean,
        default: false
      }
    },
    setup(props) {
      return {
        providers,
        activeId: props.state.activeId,
        handleSwitch: props.state.setProviderId
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .sponsor-tabs {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    text-align: center;
    color: $text-disabled;
    letter-spacing: 1px;

    .item {
      height: 5rem;
      min-width: 4rem;
      position: relative;
      display: inline-flex;
      justify-content: center;
      align-items: center;

      .logo {
        $size: 2rem;
        width: $size;
        height: $size;
        display: inline-block;
        filter: grayscale(1);
        text-align: right;

        img {
          height: $size;
          object-fit: contain;
        }
      }

      .title {
        font-weight: bold;
        margin-left: $gap;
        color: $text-secondary;
        transition: color $transition-time-fast;
      }

      &.github {
        .logo {
          img {
            height: 2.2rem;
          }
        }
      }

      &.active,
      &:hover {
        .logo {
          filter: grayscale(0);
        }
        .title {
          color: $link-color;
        }
      }
    }
  }
</style>
