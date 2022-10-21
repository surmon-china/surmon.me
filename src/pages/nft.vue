<template>
  <div class="nft-page">
    <page-banner :position="60" image="/images/page-nft/banner.jpg">
      <template #title>
        <webfont>
          <i18n zh="旷古无两，数字典藏" en="NFT Bar" />
        </webfont>
      </template>
      <template #description>
        <i18n zh="由我铸造 / 收藏的独一无二的数字藏品" en="Unique NFTs minted by me" />
      </template>
    </page-banner>
    <container class="page-statistic">
      <transition name="module" mode="out-in">
        <div class="skeletons" v-if="openseaCollections.fetching">
          <skeleton-base class="item" :key="s" v-for="s in 5" />
        </div>
        <ul class="statistics" v-else>
          <li class="item">
            <p class="title"><i18n zh="总交易量" en="Total Volume" /></p>
            <h3 class="count">{{ openseaCollections.totalVolume || '0.00' }}</h3>
          </li>
          <li class="item">
            <p class="title"><i18n zh="总售出量" en="Total Sales" /></p>
            <h3 class="count">{{ openseaCollections.totalSales || '0.00' }}</h3>
          </li>
          <li class="item">
            <p class="title">
              <i18n zh="NFTs / 系列" en="Assets / Colls" />
            </p>
            <h3 class="count">
              {{ openseaCollections.assetsCount }}
              /
              {{ openseaCollections.data.length }}
            </h3>
          </li>
          <li class="item">
            <p class="title"><i18n zh="地板价" en="floor price" /></p>
            <h3 class="count">{{ openseaCollections.floorPrice || '0.00' }}</h3>
          </li>
          <li class="item">
            <p class="title"><i18n zh="平均售价" en="average price" /></p>
            <h3 class="count">{{ openseaCollections.average_price || '0.00' }}</h3>
          </li>
        </ul>
      </transition>
    </container>
    <container class="page-content">
      <placeholder :data="openseaAssets.assets.length" :loading="openseaAssets.fetching">
        <template #placeholder>
          <empty class="asset-empty" key="empty">NULL</empty>
        </template>
        <template #loading>
          <ul class="asset-skeleton" key="skeleton">
            <li v-for="item in 8" :key="item" class="item">
              <skeleton-base class="image" />
              <skeleton-paragraph class="paragraph" :lines="4" :align="true" line-height="1em" />
            </li>
          </ul>
        </template>
        <template #default>
          <ul class="asset-list">
            <li class="asset" :key="index" v-for="(asset, index) in openseaAssets.assets">
              <div
                class="image"
                :style="{ backgroundImage: `url('${getTargetProxyURL(asset.image_url)}')` }"
              >
                <ulink
                  class="contract"
                  :href="getEtherscanURL(asset.asset_contract.address)"
                  @click="handleGTagEvent('asset_contract_link', asset.name)"
                >
                  <i class="iconfont icon-coin"></i>
                  <span class="text">{{ asset.asset_contract.schema_name }}</span>
                </ulink>
                <ulink
                  class="external"
                  v-if="asset.external_link"
                  :href="asset.external_link"
                  @click="handleGTagEvent('asset_external_link', asset.name)"
                >
                  <i class="iconfont icon-new-window-s"></i>
                </ulink>
                <div class="links">
                  <ulink
                    class="item"
                    v-if="asset.collection.discord_url"
                    :href="asset.collection.discord_url"
                    @click="handleGTagEvent('asset_collection_discord_url', asset.name)"
                  >
                    <i class="iconfont icon-discord"></i>
                  </ulink>
                  <ulink
                    class="item"
                    v-if="asset.collection.telegram_url"
                    :href="asset.collection.telegram_url"
                    @click="handleGTagEvent('asset_collection_telegram_url', asset.name)"
                  >
                    <i class="iconfont icon-telegram"></i>
                  </ulink>
                </div>
              </div>
              <div class="content">
                <ulink
                  class="name"
                  :title="asset.name"
                  :href="asset.permalink"
                  @click="handleGTagEvent('asset_name_link', asset.name)"
                >
                  {{ asset.name }}
                </ulink>
                <ulink
                  class="collection"
                  :title="asset.collection.name"
                  :href="getOpenSeaCollectionURL(asset.collection.slug)"
                  @click="handleGTagEvent('asset_collection_link', asset.name)"
                >
                  {{ asset.collection.name }}
                </ulink>
                <div class="description" :title="asset.description">
                  <markdown :markdown="asset.description" :sanitize="true" :compact="true" />
                </div>
              </div>
            </li>
          </ul>
        </template>
      </placeholder>
      <div class="viewmore">
        <ulink class="link" :href="VALUABLE_LINKS.OPENSEA">
          <i18n>
            <template #zh>
              在 <i class="iconfont icon-opensea"></i> OpenSea 查看更多 NFTs
            </template>
            <template #en>
              View all NFTs on <i class="iconfont icon-opensea"></i> OpenSea
            </template>
          </i18n>
        </ulink>
      </div>
    </container>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Language, LanguageKey } from '/@/language'
  import { useUniversalFetch } from '/@/universal'
  import { useStores } from '/@/stores'
  import { useEnhancer } from '/@/app/enhancer'
  import { getEtherscanURL, getOpenSeaCollectionURL } from '/@/transforms/nft'
  import { getTargetProxyURL } from '/@/transforms/url'
  import { GAEventCategories } from '/@/constants/gtag'
  import { META, VALUABLE_LINKS } from '/@/config/app.config'
  import Markdown from '/@/components/common/markdown.vue'
  import PageBanner from '/@/components/common/banner.vue'

  export default defineComponent({
    name: 'NftPage',
    components: {
      PageBanner,
      Markdown
    },
    setup() {
      const { i18n, meta, gtag, isZhLang } = useEnhancer()
      const { openseaAssets, openseaCollections } = useStores()
      const handleGTagEvent = (event: string, label: string) => {
        gtag?.event(event, {
          event_category: GAEventCategories.NFT,
          event_label: label
        })
      }

      meta(() => {
        const enTitle = i18n.t(LanguageKey.PAGE_NFT, Language.English)!
        const titles = isZhLang.value ? [i18n.t(LanguageKey.PAGE_NFT), enTitle] : [enTitle]
        return {
          pageTitle: titles.join(' | '),
          description: `${META.author} 铸造的数字藏品`,
          ogType: 'product'
        }
      })

      useUniversalFetch(() => {
        return Promise.all([
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          openseaAssets.fetch().catch(() => {}),
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          openseaCollections.fetch().catch(() => {})
        ])
      })

      return {
        VALUABLE_LINKS,
        LanguageKey,
        openseaAssets,
        openseaCollections,
        getTargetProxyURL,
        getEtherscanURL,
        getOpenSeaCollectionURL,
        handleGTagEvent
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .nft-page {
    min-height: $full-page-active-content-height;
    display: flex;
    flex-direction: column;

    .page-statistic {
      padding: 3rem 0;
      background-color: $module-bg-translucent;

      .skeletons,
      .statistics {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }

      .skeletons {
        .item {
          width: 5em;
          height: 2em;
        }
      }

      .statistics {
        margin: 0;
        padding: 0;
        list-style: none;

        .item {
          .title {
            margin: 0;
            text-transform: uppercase;
            color: $text-secondary;
          }

          .count {
            margin: 0;
            font-size: $font-size-h1 * 1.3;
            font-weight: bold;
          }
        }
      }
    }

    .page-content {
      flex-grow: 1;

      .asset-empty {
        min-height: 28rem;
        font-weight: bold;
      }

      .asset-skeleton,
      .asset-list {
        list-style: none;
        margin: 2rem 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: $gap * 2;
      }

      .asset-skeleton {
        .item {
          height: 280px;
          padding: 1rem;
          @include radius-box($sm-radius);
          @include common-bg-module();

          .image {
            height: 150px;
            margin-bottom: 1em;
          }
        }
      }

      .asset-list {
        .asset {
          position: relative;
          display: block;
          height: auto;
          @include radius-box($sm-radius);
          @include common-bg-module();

          .image {
            position: relative;
            width: 100%;
            height: 245px;
            overflow: hidden;
            background-color: $white;
            background-size: cover;
            background-position: center;

            .contract {
              position: absolute;
              top: 1em;
              left: 1em;
              height: 2rem;
              padding: 0 0.5em;
              display: inline-flex;
              align-items: center;
              color: $text-secondary;
              background-color: $module-bg-lighter;
              @include radius-box($sm-radius);
              &:hover {
                color: $link-color;
              }

              .text {
                font-weight: bold;
                font-size: $font-size-small;
                margin-left: $xs-gap;
              }
            }

            .links {
              position: absolute;
              right: 1em;
              bottom: 1em;
              display: flex;

              .item {
                display: inline-block;
                width: 2rem;
                height: 2rem;
                line-height: 2rem;
                text-align: center;
                margin-left: $sm-gap;
                color: $text-secondary;
                background-color: $module-bg-lighter;
                @include radius-box($sm-radius);
                &:hover {
                  color: $link-color;
                }
              }
            }

            .external {
              position: absolute;
              top: 1em;
              right: 1em;
              color: $white;
            }
          }

          .content {
            padding: $lg-gap;

            .name {
              display: block;
              font-weight: bold;
              font-size: $font-size-h4;
            }

            .collection {
              display: block;
              margin-top: $xs-gap;
            }

            .name,
            .collection {
              max-width: 100%;
              @include text-overflow();
              &:hover {
                color: $link-color;
                @include text-underline();
              }
            }

            .description {
              color: $text-secondary;
              font-size: $font-size-small;
              margin-top: $sm-gap;
              margin-bottom: 0;
              line-height: 1.6;
              @include clamp(5);

              ::v-deep(p) {
                line-height: 1.6em;
                margin-bottom: $xs-gap !important;
                &:last-child {
                  margin-bottom: 0 !important;
                }
              }

              ::v-deep(hr) {
                margin: $sm-gap 0 !important;
              }

              section,
              p {
                font-size: $font-size-small;
              }
            }
          }
        }
      }

      .viewmore {
        margin: 2rem 0;
        text-align: center;

        .link {
          display: inline-block;
          padding: 1rem 1em;
          font-weight: bold;
          font-size: $font-size-h5;
          color: $text-divider;
          background-color: $module-bg-darker-2;
          @include radius-box($sm-radius);
          &:hover {
            color: $text-disabled;
            background-color: $module-bg-darker-3;
          }

          .iconfont {
            font-weight: normal;
            margin: 0.2em 0;
          }
        }
      }
    }
  }
</style>
