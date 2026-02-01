<script lang="ts" setup>
  defineProps({
    socialCount: {
      type: Number,
      required: true
    },
    relatedCount: {
      type: Number,
      required: true
    }
  })
</script>

<template>
  <div class="article-skeleton">
    <div class="content-skeleton">
      <skeleton class="title" />
      <div class="paragraph" :key="p" v-for="p in 3">
        <skeleton class="line" :key="i" v-for="i in 3" />
      </div>
    </div>
    <div class="shares-skeleton">
      <skeleton class="item" :key="i" v-for="i in socialCount" />
    </div>
    <ul class="related-skeleton" :style="{ '--count': relatedCount }">
      <li class="item" :key="item" v-for="item in relatedCount">
        <skeleton class="content" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .article-skeleton {
    .content-skeleton {
      margin-bottom: $gap;
      padding: $gap-lg;
      background-color: $module-bg;
      @include mix.radius-box($radius-sm);

      .title {
        width: 60%;
        height: 2rem;
        margin-inline: auto;
        margin-top: $gap-xs;
        margin-bottom: 2rem;
      }

      .paragraph {
        margin-top: $gap-lg;
        &:nth-child(3) {
          .line:nth-child(3) {
            width: 80%;
          }
        }

        .line {
          width: 100%;
          height: 1rem;
          margin-bottom: $gap;
          &:last-child {
            margin-bottom: 0;
          }
          &:nth-child(3) {
            width: 60%;
          }
        }
      }
    }

    .shares-skeleton {
      margin-bottom: $gap;
      padding: $gap-sm;
      display: flex;
      justify-content: space-between;
      background-color: $module-bg;
      @include mix.radius-box($radius-sm);

      .item {
        width: 100%;
        height: 2.4rem;
        margin-right: $gap;
        &:last-child {
          margin-right: 0;
        }
      }
    }

    .related-skeleton {
      list-style: none;
      margin-bottom: $gap;
      padding: 0;
      display: grid;
      grid-gap: $gap;
      grid-template-columns: repeat(var(--count), 1fr);

      .item {
        width: 100%;
        padding: $gap-sm;
        background-color: $module-bg;
        @include mix.radius-box($radius-sm);

        .content {
          height: 5.4rem;
        }
      }
    }
  }
</style>
