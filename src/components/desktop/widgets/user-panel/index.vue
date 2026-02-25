<script lang="ts" setup>
  import { onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { UserType } from '/@/interfaces/user'
  import { TabKeys, TABS, useTabState } from './state'
  import UserProfile from './profile.vue'
  import UserConnections from './connections.vue'
  import UserComments from './comments.vue'

  const { identity, globalState } = useEnhancer()
  const { activeId, setTabKey } = useTabState(TabKeys.Profile)

  const closeModal = () => {
    globalState.toggleSwitcher('userPanelModal', false)
  }

  onMounted(() => {
    identity.fetchUserProfile()
  })
</script>

<template>
  <div class="user-panel-modal">
    <div class="sidebar">
      <div class="avatar">
        <uimage
          class="image"
          :src="identity.userProfile?.avatar_url || ''"
          :class="{
            moderator: identity.userProfile?.type === UserType.Moderator,
            patron: identity.userProfile?.type === UserType.Patron
          }"
        />
      </div>
      <div class="menus">
        <button
          class="item"
          :class="{ active: item.id === activeId }"
          :key="item.id"
          v-for="item in TABS"
          @click="setTabKey(item.id)"
        >
          <i18n v-bind="item.i18n" />
        </button>
      </div>
    </div>
    <div class="content">
      <user-profile v-if="activeId === TabKeys.Profile" />
      <user-connections v-else-if="activeId === TabKeys.Connections" />
      <user-comments v-else-if="activeId === TabKeys.Comments" />
    </div>
    <button class="close" title="Close" @click="closeModal">
      <i class="iconfont icon-cancel"></i>
    </button>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .user-panel-modal {
    width: 40rem;
    max-width: 80vw;
    height: 41em;
    position: relative;
    display: flex;
    flex-direction: row;
    background-color: $module-bg-opaque;

    .close {
      position: absolute;
      bottom: 2rem;
      right: 2rem;
      &:hover {
        color: $color-link-hover;
      }
    }

    .sidebar {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 9rem;
      height: 100%;
      border-right: 1px solid $module-bg-darker-1;

      .avatar {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 9rem;
        border-bottom: 1px solid $module-bg-darker-1;

        .image {
          $size: 5rem;
          width: $size;
          height: $size;
          border-radius: 100%;
          background-color: $module-bg-darker-1;
          border: 4px solid $module-bg-darker-1;
          &.moderator {
            border-color: $user-primary-moderator;
          }
          &.patron {
            border-color: $user-primary-patron;
          }
        }
      }

      .menus {
        width: 100%;
        flex: 1;

        .item {
          width: 100%;
          text-align: left;
          height: 2rem;
          line-height: 2rem;
          padding-left: 2em;
          margin-top: 1rem;
          &:hover {
            color: $color-link-hover;
          }
          &.active {
            color: $primary;
          }
        }
      }
    }

    .content {
      flex: 1;
      width: 100%;
      padding: 2rem;
      overflow-x: hidden;
      overflow-y: auto;
      overscroll-behavior-y: contain;
      scroll-snap-type: y proximity;
      scrollbar-width: thin;
    }
  }
</style>
