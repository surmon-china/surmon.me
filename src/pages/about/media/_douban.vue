<template>
  <div class="douban">
    <span v-if="store.fetching"></span>
    <template v-else-if="store.data">
      <div class="genres">
        <div class="legend">
          <span
            v-for="(item, index) in list"
            class="item"
            :key="index"
            :style="{
              backgroundColor: item.color,
              width: `${item.percent}%`
            }"
          >
          </span>
        </div>
        <ul class="labels">
          <li class="item" :key="index" v-for="(item, index) in list">
            <span class="color" :style="{ backgroundColor: item.color }"></span>
            <i18n>
              <template #zh>{{ item.zhName }}（{{ item.value }}）</template>
              <template #en>{{ item.enName }} ({{ item.value }})</template>
            </i18n>
          </li>
        </ul>
      </div>
      <ul class="recent">
        <li
          class="item"
          :title="item.title"
          :key="index"
          v-for="(item, index) in store.data?.recent_subjects.slice(0, 9)"
        >
          <uimage class="cover" proxy="douban" :src="item.cover_url" />
        </li>
        <li class="item">
          <ulink class="more" :href="VALUABLE_LINKS.DOUBAN_MOVIE">
            <span class="title">More</span>
            <span class="icon">•••</span>
          </ulink>
        </li>
      </ul>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, onMounted } from 'vue'
  import { useDoubanMoviesStore } from '/@/stores/media'
  import { VALUABLE_LINKS } from '/@/config/app.config'

  // https://www.douban.com/note/318963783/?_i=3319419SDguZpe
  const GenresState = {
    动作: ['Action', '#002b43'],
    喜剧: ['Comedy', '#be3928'],
    剧情: ['Drama', '#ee6666'],
    儿童: ['Children', '#feba07'],
    青春: ['Young', '#12a182'],
    家庭: ['Family', '#5d655f'],
    爱情: ['Romance', '#ec8aa4'],
    体育: ['Sports', '#fac858'],
    科幻: ['Sci-Fi', '#112d52'],
    灾难: ['Disaster', 'black'],
    恐怖: ['Horror', 'black'],
    惊悚: ['Thriller', 'black'],
    悬疑: ['Mystery', '#114e53'],
    犯罪: ['Crime', '#5470c6'],
    冒险: ['Adventure', '#3ba272'],
    黑色: ['Film noir', 'black'],
    历史: ['Historical', 'gray'],
    战争: ['War', 'grey'],
    西部: ['Western', 'brown'],
    音乐歌舞: ['Musical', '#fc8452'],
    人物传记: ['Biography', '#73c0de'],
    动画: ['Animation', 'yellow'],
    成人: ['Adult', '#e43a61'],
    古装: ['Costume', '#5d655f']
  }

  export default defineComponent({
    name: 'AboutPageDoubanMedia',
    setup() {
      const store = useDoubanMoviesStore()
      const count = computed<number>(() => {
        return store.data?.genres.reduce((result, item) => result + item.value, 0)
      })
      const list = computed(() => {
        return store.data?.genres
          .map((item) => ({
            value: item.value,
            zhName: item.name,
            enName: GenresState[item.name][0],
            color: GenresState[item.name][1],
            percent: (item.value / count.value) * 100
          }))
          .sort((a, b) => b.value - a.value)
      })

      onMounted(() => store.fetch())

      return {
        VALUABLE_LINKS,
        store,
        list
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .douban {
    width: 100%;
    padding: $gap;
    border-radius: $lg-radius;
    margin-bottom: 2rem;
    @include common-bg-module();

    .genres {
      width: 100%;
      margin-bottom: 2em;

      .legend {
        width: 100%;
        height: 14px;
        display: flex;
        margin-bottom: $lg-gap;
        @include radius-box($xs-radius);
        .item {
          height: 100%;
        }
      }

      .labels {
        list-style: none;
        margin: 0;
        padding: 0 $xs-gap;
        display: flex;
        justify-content: space-between;

        .item {
          display: flex;
          align-items: center;
          font-size: $font-size-base - 1;

          .color {
            width: 1em;
            height: 1em;
            display: inline-block;
            margin-right: $xs-gap;
            background-color: $module-bg-darker-1;
            @include radius-box($xs-radius);
          }
        }
      }
    }

    .recent {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      grid-gap: $gap;

      .item {
        position: relative;
        width: 100%;
        height: 10rem;
        background-color: $module-bg-darker-1;
        @include radius-box($sm-radius);

        .cover {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .more {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 2px dashed $text-divider;
        }
      }
    }
  }
</style>
