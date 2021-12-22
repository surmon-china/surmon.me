<template>
  <div class="like-share">
    <div class="like-box">
      <div class="item likes">
        <div class="bridge"></div>
        <button class="button" :disabled="isLiked" @click="handleLike">
          <i class="icon iconfont icon-zan"></i>
          <span class="count">{{ isLiked ? `${likes - 1} + 1` : likes }}</span>
        </button>
        <span class="text">
          <i18n>
            <template #zh>不炼金丹不坐禅，不为商贾不耕田</template>
            <template #en>Well written!</template>
          </i18n>
        </span>
      </div>
      <div class="item sponsor">
        <div class="bridge"></div>
        <button class="button" @click="handleSponsor">
          <i class="icon iconfont icon-dollar"></i>
        </button>
        <client-only>
          <popup v-model:visible="isVisibleSponsor" :border="false">
            <iframe class="sponsor-modal" :src="VALUABLE_LINKS.SPONSOR" />
          </popup>
        </client-only>
        <span class="text">
          <i18n>
            <template #zh>闲来写就青山卖，不使人间造孽钱</template>
            <template #en>Sponsor {{ title }}</template>
          </i18n>
        </span>
      </div>
    </div>
    <div class="share-box">
      <base-share class="share" :socials="socials" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useArticleDetailStore } from '/@/store/article'
  import { GAEventCategories } from '/@/constants/gtag'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { META, VALUABLE_LINKS } from '/@/config/app.config'
  import { usePageLike } from '/@/transforms/state'
  import BaseShare, { SocialMedia } from '/@/components/widget/share.vue'

  export default defineComponent({
    name: 'ArticleLikeShare',
    components: {
      BaseShare
    },
    props: {
      articleId: {
        type: Number,
        required: true
      },
      likes: {
        type: Number,
        required: true
      },
      socials: {
        type: Array as PropType<SocialMedia[]>,
        default: () => []
      }
    },
    setup(props) {
      const { i18n, gtag } = useEnhancer()
      const { isLiked, like } = usePageLike(props.articleId)
      const articleDetailStore = useArticleDetailStore()
      const isVisibleSponsor = ref(false)
      const skeletonCount = props.socials.length
        ? props.socials.length
        : Object.keys(SocialMedia).length

      const handleSponsor = () => {
        isVisibleSponsor.value = true
        gtag?.event('article_sponsor', {
          event_category: GAEventCategories.Article
        })
      }

      const handleLike = async () => {
        if (isLiked.value) {
          return false
        }
        gtag?.event('article_like', {
          event_category: GAEventCategories.Article
        })
        try {
          await articleDetailStore.postArticleLike(props.articleId)
          like()
        } catch (error) {
          const message = i18n.t(LANGUAGE_KEYS.POST_ACTION_ERROR)
          console.warn(message, error)
          alert(message)
        }
      }

      return {
        skeletonCount,
        isVisibleSponsor,
        isLiked,
        handleSponsor,
        handleLike,
        title: META.title,
        VALUABLE_LINKS
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .sponsor-modal {
    width: 600px;
    height: 200px;
    border-radius: $sm-radius !important;
  }

  .like-share {
    $share-size: 3rem;

    .like-box {
      width: 100%;
      margin-bottom: $lg-gap;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: $lg-gap;

      .item {
        position: relative;
        padding: $lg-gap $gap;
        border-radius: $sm-radius;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        @include common-bg-module();

        .bridge {
          position: absolute;
          top: -$lg-gap;
          width: $lg-gap;
          height: $lg-gap;
          background: linear-gradient(to bottom, $module-bg 60%, transparent);
        }

        .button {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 7rem;
          height: 3rem;
          border-radius: $sm-radius;
          color: $white;

          .icon {
            font-size: $font-size-h2;
          }
        }

        &.likes {
          .button {
            background-color: rgba($red, 0.6);

            &:hover {
              background-color: rgba($red, 0.8);
            }

            .count {
              margin-left: $xs-gap;
              font-weight: bold;
            }
          }
        }

        &.sponsor {
          .button {
            background-color: rgba($surmon, 0.6);
            &:hover {
              background-color: rgba($surmon, 0.8);
            }
          }
        }

        .text {
          position: relative;
          margin-top: $lg-gap;
          padding-top: $sm-gap;
          border-top: 1px solid $module-bg-darker-1;
          color: $text-secondary;
        }
      }
    }

    .share-box {
      padding: $gap;
      @include radius-box($sm-radius);
      @include common-bg-module();

      .share {
        width: 100%;
        opacity: 0.8;
        display: flex;
        justify-content: space-between;
        &:hover {
          opacity: 1;
        }

        ::v-deep(.share-ejector) {
          flex-grow: 1;
          width: auto;
          height: $share-size;
          line-height: $share-size;
          margin-right: $gap;
          font-size: $font-size-h4;
          border-radius: $xs-radius;
          background-color: $module-bg-darker-1;

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
</style>
