<script lang="ts" setup>
  import { Language } from '/@/locales'
  import { useEnhancer } from '/@/app/enhancer'
  import { I18nLocaleMap } from '/@/composables/i18n'
  import { numberToChinese } from '/@/transforms/text'
  import type { ArchiveTreeList } from '/@/stores/archive'

  const props = defineProps<{
    tree: ArchiveTreeList
  }>()

  const { isZhLang } = useEnhancer()

  const ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const monthNameI18ns: Array<I18nLocaleMap<Language>> = ms.map((month, index) => ({
    [Language.English]: month,
    [Language.Chinese]:
      index === 9 ? '十月' : index == 10 ? '十一' : index == 11 ? '十二' : numberToChinese(index + 1) + '月'
  }))

  const getMonthNameI18n = (number: number) => {
    return monthNameI18ns[number - 1]
  }
</script>

<template>
  <div class="archive-tree">
    <ul class="month-list" v-for="node in props.tree" :key="node.year">
      <li v-for="mn in node.months" :key="mn.month" class="month">
        <slot
          name="title"
          :title="
            !isZhLang
              ? `${node.year} #${getMonthNameI18n(mn.month).en} (${mn.articles.length})`
              : `${numberToChinese(node.year)} #${getMonthNameI18n(mn.month).zh}（${mn.articles.length}）`
          "
        >
        </slot>
        <ul class="article-list">
          <li v-for="(article, index) in mn.articles" :key="index" class="article">
            <slot
              name="article"
              :index="index"
              :article="article"
              :day="String(article.createAt.day).padStart(2, '0')"
            ></slot>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .archive-tree {
    .month-list,
    .article-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .article-list {
    }
  }
</style>
