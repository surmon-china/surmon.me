/**
 * @file Base fetch store
 * @module store.fetch-store
 * @author Surmon <https://github.com/surmon-china>
 */

import { UnwrapRef } from 'vue'
import { defineStore, StateTree, PiniaCustomStateProperties } from 'pinia'

// https://github.com/vuejs/pinia/blob/v2/packages/pinia/src/types.ts#L538
type GettersTree<S extends StateTree> = Record<
  string,
  ((state: UnwrapRef<S> & UnwrapRef<PiniaCustomStateProperties<S>>) => any) | (() => any)
>

interface StoreState<D> {
  fetching: boolean
  fetched: boolean
  data: D
}

export interface FetchStoreOptions<D, G, A> {
  id: string
  fetcher(args?: A): Promise<D>
  initData: D
  onlyOnce?: boolean
  cleanWhenRefetch?: boolean
  getters?: G
}

export function defineFetchStore<
  D = any,
  G extends GettersTree<StoreState<D>> = GettersTree<StoreState<D>>,
  A = any
>(options: FetchStoreOptions<D, G, A>) {
  return defineStore<string, StoreState<D>, G, { fetch: (args?: A) => Promise<void> }>({
    id: options.id,
    state: () => ({
      fetching: false,
      fetched: false,
      data: options.initData
    }),
    getters: (options.getters ?? {}) as G,
    actions: {
      async fetch(args?: A) {
        if (options.onlyOnce && this.fetched) {
          return
        }
        if (options.cleanWhenRefetch) {
          // @ts-ignore
          this.data = options.initData
        }
        this.fetching = true
        try {
          const result = await options.fetcher(args)
          // @ts-ignore
          this.data = result ?? null
          this.fetched = true
        } finally {
          this.fetching = false
        }
      }
    }
  })
}

// const useTestStore = defineFetchStore({
//   id: 'testStore',
//   initData: [] as Array<{ a: number }>,
//   fetcher: () => Promise.resolve([]),
//   getters: { loading: (state) => state.fetching }
// })

// const testStore = useTestStore()
// testStore.$state.data
// testStore.loading
