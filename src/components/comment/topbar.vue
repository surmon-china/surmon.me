<script lang="ts" setup>
  import { computed, toRaw } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { APP_PROFILE } from '/@/configs/app.config'
  import { LocalesKey } from '/@/locales'
  import { SortMode } from '/@/constants/biz-state'
  import { GAEventCategories } from '/@/constants/google-analytics'
  import { UserType, useIdentityStore } from '/@/stores/identity'
  import { openPopupWindow, openNewWindow } from '/@/utils/opener'
  import { logger, CommentEvents } from './helper'
  import nodepress from '/@/services/nodepress'

  interface Props {
    postId: number
    sort: SortMode
    fetching: boolean
    loading: boolean
    loaded?: number
    total?: number
    plain?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    total: 0,
    loaded: 0,
    plain: false
  })

  const emit = defineEmits<{
    (e: CommentEvents.Sort, sort: SortMode): void
  }>()

  const { gtag } = useEnhancer()
  const identity = useIdentityStore()
  const user = computed(() => identity.user)
  const statisticsText = computed(() => {
    return props.loading ? `···` : `${props.loaded} / ${props.total}`
  })

  const disqusThreadMap = new Map<number, any>()
  const handleDisqusThread = async () => {
    gtag?.event('disqus_thread_page', {
      event_category: GAEventCategories.Comment,
      event_label: `id: ${props.postId}`
    })

    if (!disqusThreadMap.has(props.postId)) {
      const response = await nodepress.get('/disqus/thread', {
        params: { post_id: props.postId }
      })
      disqusThreadMap.set(props.postId, response.result)
    }

    const forum = identity.disqusConfig.forum
    const slug = disqusThreadMap.get(props.postId).slug
    openNewWindow(`https://disqus.com/home/discussion/${forum}/${slug}/`)
  }

  const handleSort = (target: any) => {
    gtag?.event('comment_sort_switch', {
      event_category: GAEventCategories.Comment
    })

    const value = Number(target?.value)
    if (value !== props.sort) {
      emit(CommentEvents.Sort, value)
    }
  }

  const handleDisqusLogin = () => {
    gtag?.event('disqus_login', {
      event_category: GAEventCategories.Comment,
      event_label: `id: ${props.postId}`
    })

    openPopupWindow(identity.disqusConfig.authorize_url, {
      name: `Disqus Auth ${APP_PROFILE.title}`,
      onClose: () => {
        identity.fetchDisqusUserInfo()
        logger.info('disqus logined', toRaw(identity.user))
      }
    })
  }

  const handleDisqusLogout = () => {
    identity.fetchDisqusLogout()
    logger.log('disqus logout')
    gtag?.event('disqus_logout', {
      event_category: GAEventCategories.Comment,
      event_label: `id: ${props.postId}`
    })
  }

  const handleClearLocalProfile = () => {
    identity.removeLocalUser()
  }
</script>

<template>
  <placeholder :loading="fetching">
    <template #loading>
      <div class="topbar-skeleton" key="skeleton">
        <div class="left">
          <skeleton-line class="skeleton-item count" />
          <skeleton-line class="skeleton-item sort" v-if="!plain" />
        </div>
        <div class="right">
          <skeleton-line class="skeleton-item user" />
        </div>
      </div>
    </template>
    <template #default>
      <div class="topbar" :class="{ plain }" key="element">
        <div class="statistics">
          <div class="total" :class="{ loading }">
            <i class="iconfont icon-discussion"></i>
            <i18n>
              <template #zh>
                共 <span class="count">{{ statisticsText }}</span> 条看法
              </template>
              <template #en>
                <span class="count">{{ statisticsText }}</span> comments
              </template>
            </i18n>
          </div>
          <label class="sort">
            <span class="icon">▼</span>
            <select class="select" name="sort" :value="sort" @change="handleSort($event.target)">
              <option :value="SortMode.Latest">
                <i18n :k="LocalesKey.COMMENT_SORT_NEW" />
              </option>
              <option :value="SortMode.Hottest">
                <i18n :k="LocalesKey.COMMENT_SORT_HOT" />
              </option>
              <option :value="SortMode.Oldest">
                <i18n :k="LocalesKey.COMMENT_SORT_OLD" />
              </option>
            </select>
          </label>
          <button class="disqus" @click="handleDisqusThread">
            <i class="iconfont icon-disqus-logo"></i>
          </button>
          <slot name="extra"></slot>
        </div>
        <div class="user">
          <div class="unlogin" v-if="user.type === UserType.Null">
            <button class="disqus" @click="handleDisqusLogin">
              <i18n>
                <template #zh>使用<i class="iconfont icon-disqus"></i>登录</template>
                <template #en>Login by<i class="iconfont icon-disqus right"></i></template>
              </i18n>
            </button>
          </div>
          <div class="logined" v-else>
            <template v-if="user.type === UserType.Local">
              <div class="name">
                <i class="icon guest iconfont icon-user"></i>
                <span class="text">{{ user.localProfile?.name || '' }}</span>
                <i class="arrow iconfont icon-down-arrow"></i>
              </div>
              <div class="user-menu">
                <ul class="menus">
                  <li class="item">
                    <button class="button" @click="handleDisqusLogin">
                      <i18n>
                        <template #zh>换为<i class="iconfont icon-disqus disqus"></i>登录</template>
                        <template #en>Login by <i class="iconfont icon-disqus disqus"></i></template>
                      </i18n>
                    </button>
                  </li>
                  <li class="item">
                    <button class="button" @click="handleClearLocalProfile">
                      <i18n zh="退出本地访客身份" en="Clean local profile" />
                    </button>
                  </li>
                </ul>
              </div>
            </template>
            <template v-else-if="user.type === UserType.Disqus">
              <div class="name">
                <i class="icon disqus iconfont icon-disqus-logo"></i>
                <span class="text">{{ user.disqusProfile?.name || '' }}</span>
                <i class="arrow iconfont icon-down-arrow"></i>
              </div>
              <div class="user-menu">
                <ul class="menus">
                  <li class="item">
                    <ulink class="button" :href="user.disqusProfile.profileUrl">
                      <i18n zh="访问 Disqus 主页" en="Disqus profile" />
                    </ulink>
                  </li>
                  <li class="item">
                    <button class="button" @click="handleDisqusLogout">
                      <i18n zh="注销授权身份" en="Disqus logout" />
                    </button>
                  </li>
                </ul>
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
  </placeholder>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  // local variables
  $topbar-size: 2em;

  .topbar,
  .topbar-skeleton {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .topbar-skeleton {
    .left,
    .right {
      height: $topbar-size;
    }
    .skeleton-item {
      &.count {
        width: 12rem;
        margin-right: $gap;
      }
      &.sort {
        width: 8rem;
      }
      &.user {
        width: 8rem;
      }
    }

    .left {
      display: flex;
    }
  }

  .topbar {
    &.plain {
      flex-direction: column;
      align-items: baseline;
      height: 6rem;
    }

    .statistics {
      display: flex;
      height: $topbar-size;
      line-height: $topbar-size;

      .total {
        padding: 0;
        padding-right: 0.6em;
        background-color: $module-bg-darker-1;
        @include mix.radius-box($radius-xs);
        will-change: width;
        transition: all $motion-duration-fast;
        max-width: 180px;
        &.loading {
          max-width: 130px;
        }

        .iconfont {
          display: inline-block;
          width: $topbar-size;
          height: $topbar-size;
          text-align: center;
          margin-right: $gap-xs;
          background-color: $module-bg-darker-2;
          @include mix.background-transition();
        }

        .count {
          font-weight: bold;
          margin: 0 $gap-xs;
        }
      }

      .sort,
      .disqus {
        margin-left: $gap;
        background-color: $module-bg-darker-1;
        @include mix.radius-box($radius-xs);
        &:hover {
          background-color: $module-bg-darker-2;
        }
      }

      .sort {
        position: relative;

        .icon {
          display: inline-flex;
          align-items: center;
          position: absolute;
          top: 0;
          left: $gap-sm;
          height: 100%;
          font-size: $font-size-small;
          pointer-events: none;
        }

        .select {
          padding: 0 $gap-sm 0 $gap * 2;
          font-weight: bold;
          appearance: none;
          background: none;
          vertical-align: baseline;
          user-select: none;
          cursor: pointer;
        }
      }

      .disqus {
        width: $topbar-size;
        text-align: center;
        &:hover {
          color: $white;
          background-color: $disqus-primary;
        }
      }
    }

    .user {
      .unlogin {
        display: flex;
        align-items: center;

        .disqus {
          padding-top: 2px;
          padding-bottom: 2px;
          border-top: 1px solid transparent;
          border-bottom: 1px solid transparent;
          &:hover {
            font-weight: bold;
            border-bottom-color: $color-text-secondary;
            .iconfont {
              font-weight: normal;
            }
          }

          .iconfont {
            margin: 0 $gap-sm;
            color: $disqus-primary;
            font-size: $font-size-small;
            &.right {
              margin-right: 0;
            }
          }
        }
      }

      .logined {
        position: relative;
        display: inline-block;
        cursor: pointer;
        &:hover {
          .name {
            background-color: $module-bg-darker-2;
          }
          .user-menu {
            display: block;
          }
        }

        .name {
          padding: 0 $gap;
          height: $topbar-size;
          display: flex;
          align-items: center;
          background-color: $module-bg-darker-1;
          @include mix.radius-box($radius-xs);

          .icon {
            &.disqus {
              font-size: $font-size-h4;
              color: $disqus-primary;
            }
          }

          .text {
            margin-right: $gap-xs;
            margin-left: $gap-sm;
            font-weight: bold;
          }

          .arrow {
            color: $color-text-divider;
            font-size: $font-size-small;
          }
        }

        .user-menu {
          display: none;
          position: absolute;
          right: 0;
          padding-top: 0.5em;
          z-index: $z-index-normal + 1;
          .menus {
            margin: 0;
            padding: 0;
            list-style: none;
            @include mix.radius-box($radius-xs);

            .item {
              .button {
                white-space: nowrap;
                display: block;
                width: 100%;
                padding: 0 $gap;
                line-height: 2.3em;
                text-align: right;
                font-size: $font-size-small;
                background-color: $module-bg-darker-2;
                &:hover {
                  background-color: $module-bg-darker-3;
                }

                .iconfont {
                  &.disqus {
                    color: $disqus-primary;
                    font-size: 10px;
                    margin: 0 $gap-xs;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
