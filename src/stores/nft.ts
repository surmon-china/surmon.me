/**
 * @file NFT state
 * @module store.nft
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineFetchStore } from './_fetch'
import { TunnelModule } from '/@/constants/tunnel'
import type {
  OpenSeaAssetItem,
  OpenSeaAssetsResult,
  OpenSeaCollection
} from '/@/server/getters/opensea'
import tunnel from '/@/services/tunnel'

export const useOpenSeaAssetsStore = defineFetchStore({
  id: 'openseaAssets',
  initData: null as null | OpenSeaAssetsResult,
  fetcher: () => tunnel.dispatch<OpenSeaAssetsResult>(TunnelModule.OpenSeaAssets),
  getters: {
    assets: (state): OpenSeaAssetItem[] => state.data?.assets ?? []
  }
})

export const useOpenSeaCollectionsStore = defineFetchStore({
  id: 'openseaCollections',
  initData: [] as Array<OpenSeaCollection>,
  fetcher: () => tunnel.dispatch<Array<OpenSeaCollection>>(TunnelModule.OpenSeaCollections),
  getters: {
    assetsCount: (state) => state.data.reduce((plus, c) => plus + c.stats.count, 0),
    // MARK: different contract
    totalVolume: (state) => state.data.reduce((plus, c) => plus + c.stats.total_volume, 0),
    // MARK: different contract
    totalSales: (state) => state.data.reduce((plus, c) => plus + c.stats.total_sales, 0),
    // MARK: different contract
    floorPrice: (state) => Math.min(...state.data.map((c) => c.stats.floor_price)),
    // MARK: different contract
    average_price: (state) => {
      const total = state.data.reduce((plus, c) => plus + c.stats.average_price, 0)
      return total / state.data.length
    }
  }
})
