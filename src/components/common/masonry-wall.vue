<script setup lang="ts" generic="T">
  import type { VNode } from 'vue'
  import { ref, shallowRef, onMounted, nextTick } from 'vue'

  export interface MasonryRef<T> {
    element: HTMLElement
    resetItems: (items?: T[]) => Promise<void>
    appendItems: (newItems: T[]) => Promise<void>
    removeItems: (predicate: (item: T) => boolean) => void
  }

  export interface Props<T> {
    initialItems: T[]
    columns: number
    rowGap?: string
    colGap?: string
    ssrInitialRender?: boolean
  }

  const props = withDefaults(defineProps<Props<T>>(), {
    rowGap: '1rem',
    colGap: '1rem'
  })

  const emit = defineEmits<{
    (event: 'mounted', payload: MasonryRef<T>): void
  }>()

  const slots = defineSlots<{
    default?: (props: { item: T; column: number; row: number; index: number }) => VNode
  }>()

  const createColumns = (count: number) => {
    return Array.from({ length: count }).map<number[]>(() => [])
  }

  let innerItems: T[] = [...props.initialItems]

  const element = shallowRef<HTMLElement | null>(null)
  const columnsTree = ref<number[][]>(createColumns(props.columns))
  const filledIndex = ref(0)
  let currentRedrawId = 0

  const fillColumns = async (startIndex: number, assignedRedrawId: number) => {
    if (!element.value) return
    const columnDivs = [...element.value.children] as HTMLDivElement[]
    for (let i = startIndex; i < innerItems.length; i++) {
      await nextTick()
      // Skip if a new redraw has been requested in parallel,
      // e.g., in an onMounted hook during initial render
      if (currentRedrawId !== assignedRedrawId) return
      const target = columnDivs.reduce((prev, curr) =>
        curr.getBoundingClientRect().height < prev.getBoundingClientRect().height ? curr : prev
      )
      const colIndex = +target.dataset.index!
      columnsTree.value[colIndex].push(i)
    }
    filledIndex.value = innerItems.length
  }

  const resetItems = async (items: T[] = []) => {
    columnsTree.value = createColumns(props.columns)
    innerItems = [...items]
    filledIndex.value = 0
    await fillColumns(filledIndex.value, ++currentRedrawId)
  }

  const appendItems = async (newItems: T[]) => {
    const start = innerItems.length
    innerItems.push(...newItems)
    await fillColumns(start, ++currentRedrawId)
  }

  const removeItems = (predicate: (item: T) => boolean) => {
    const map = new Map<number, boolean>()
    innerItems.forEach((item, i) => {
      if (predicate(item)) map.set(i, true)
    })
    for (const col of columnsTree.value) {
      for (let i = col.length - 1; i >= 0; i--) {
        if (map.has(col[i])) {
          col.splice(i, 1)
        }
      }
    }
  }

  // Initial render handling for SSR
  if (props.ssrInitialRender) {
    const columns = createColumns(props.columns)
    for (let i = 0; i < props.initialItems.length; i++) {
      columns[i % props.columns].push(i)
    }
    columnsTree.value = columns
    innerItems = [...props.initialItems]
    filledIndex.value = props.initialItems.length
  }

  onMounted(async () => {
    // Handle initial items and fill columns after the component is mounted (client-side)
    // But if SSR is used, do not redraw items in client-side, immediately use the pre-rendered structure
    if (!props.ssrInitialRender) {
      await resetItems(props.initialItems)
    }

    emit('mounted', {
      element: element.value!,
      resetItems,
      appendItems,
      removeItems
    })
  })
</script>

<template>
  <div
    ref="element"
    class="masonry-wall"
    :style="{ '--grid-columns': props.columns, gap: props.rowGap }"
    data-allow-mismatch
  >
    <transition-group
      tag="ul"
      name="list"
      class="masonry-column"
      v-for="(column, columnIndex) in columnsTree"
      :key="columnIndex"
      :data-index="columnIndex"
      :style="{ gap: props.colGap }"
    >
      <li class="masonry-item" v-for="(itemIndex, row) in column" :key="itemIndex">
        <slot :item="innerItems[itemIndex]!" :column="columnIndex" :row="row" :index="itemIndex"></slot>
      </li>
    </transition-group>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .masonry-wall {
    display: grid;
    grid-template-columns: repeat(var(--grid-columns), 1fr);

    .masonry-column {
      list-style: none;
      padding: 0;
      margin: 0;
      min-width: 0;
      width: 100%;
      height: max-content;
      display: flex;
      flex-direction: column;

      .masonry-item {
      }
    }
  }
</style>
