/**
 * @file fetch store enhance
 * @module store.fetch-store
 * @author Surmon <https://github.com/surmon-china>
 */

import { Ref, ref, shallowRef } from 'vue'
import { isUndefined } from '/@/constants/value'

export interface FetchStoreOptions<Data> {
  data: Data
  fetcher(...args: $TODO): Promise<Data>
  once?: boolean
  preclean?: boolean
  shallow?: boolean
}

export const createFetchStore = <Data>(options: FetchStoreOptions<Data>) => {
  // default: shallow
  const isShallow = isUndefined(options.shallow) ? true : options.shallow
  const refWrapper = isShallow ? shallowRef : ref
  const fetching = ref(false)
  const fetched = ref(false)
  const data: Ref<Data> = refWrapper<Data>(options.data) as any

  const fetch = async (...args: $TODO) => {
    // about fetch when fetched
    if (options.once && fetched.value) {
      return
    }

    // change state first
    fetching.value = true

    // clean data
    if (options.preclean) {
      data.value = options.data
    }

    // fetch data
    try {
      const result = await options.fetcher(...args)
      data.value = result
      fetched.value = true
    } finally {
      fetching.value = false
    }
  }

  return {
    data,
    fetching,
    fetched,
    fetch
  }
}
