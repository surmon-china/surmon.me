/**
 * @file BFF opensea getter
 * @module server.getter.opensea
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from 'axios'
import { IDENTITIES } from '@/config/app.config'

// https://docs.opensea.io/reference/collection-model
export interface OpenSeaCollection {
  primary_asset_contracts: []
  traits: Record<string, Record<string, number>>
  stats: {
    one_hour_volume: number
    one_hour_change: number
    one_hour_sales: number
    one_hour_sales_change: number
    one_hour_average_price: number
    one_hour_difference: number
    six_hour_volume: number
    six_hour_change: number
    six_hour_sales: number
    six_hour_sales_change: number
    six_hour_average_price: number
    six_hour_difference: number
    one_day_volume: number
    one_day_change: number
    one_day_sales: number
    one_day_sales_change: number
    one_day_average_price: number
    one_day_difference: number
    seven_day_volume: number
    seven_day_change: number
    seven_day_sales: number
    seven_day_average_price: number
    seven_day_difference: number
    thirty_day_volume: number
    thirty_day_change: number
    thirty_day_sales: number
    thirty_day_average_price: number
    thirty_day_difference: number
    total_volume: number
    total_sales: number
    total_supply: number
    count: number
    num_owners: number
    average_price: number
    num_reports: number
    market_cap: number
    floor_price: number
  }
  banner_image_url: string
  chat_url: string | null
  created_date: string
  default_to_fiat: boolean
  description: string
  dev_buyer_fee_basis_points: string
  dev_seller_fee_basis_points: string
  discord_url: string
  display_data: {
    card_display_style: string
  }
  external_url: string | null
  featured: boolean
  featured_image_url: string
  hidden: boolean
  safelist_request_status: string
  image_url: string
  is_subject_to_whitelist: boolean
  large_image_url: string
  medium_username: string | null
  name: string
  only_proxied_transfers: boolean
  opensea_buyer_fee_basis_points: string
  opensea_seller_fee_basis_points: string
  payout_address: string
  require_email: boolean
  short_description: string | null
  slug: string
  telegram_url: string | null
  twitter_username: string | null
  instagram_username: string | null
  wiki_url: string | null
  is_nsfw: boolean
  fees: Record<string, Record<string, number>>
  is_rarity_enabled: boolean
  owned_asset_count: number
}

// https://docs.opensea.io/reference/asset-object
export interface OpenSeaAssetItem {
  id: number
  name: string
  image_url: string
  background_color: string | null
  external_link: string | null
  last_sale: string
  traits: Array<{
    trait_type: string
    trait_count: number
    value: string
  }>
  collection: Omit<OpenSeaCollection, 'stats' | 'traits'>
  asset_contract: {
    address: string
    asset_contract_type: string
    created_date: string
    name: string
    nft_version: string | null
    opensea_version: string
    owner: number
    schema_name: string
    symbol: string
    total_supply: string | null
    description: string
    external_link: string | null
    image_url: string
    default_to_fiat: boolean
    dev_buyer_fee_basis_points: number
    dev_seller_fee_basis_points: number
    only_proxied_transfers: boolean
    opensea_buyer_fee_basis_points: number
    opensea_seller_fee_basis_points: number
    buyer_fee_basis_points: number
    seller_fee_basis_points: number
    payout_address: string
  }
  owner: {
    user: {
      username: string
    }
    profile_img_url: string
    address: string
    config: string
  }
  creator: {
    user: {
      username: string
    }
    profile_img_url: string
    address: string
    config: string
  }
  num_sales: number
  image_preview_url: string | null
  image_thumbnail_url: string | null
  image_original_url: string | null
  animation_url: string | null
  animation_original_url: string | null
  description: string
  permalink: string
  decimals: string
  token_metadata: string
  is_nsfw: boolean
  seaport_sell_orders: Array<any> | null
  top_bid: string
  listing_date: string
  is_presale: true
  transfer_fee: string
  transfer_fee_payment_token: string
  supports_wyvern: true
  rarity_data: string
  token_id: string
}

export interface OpenSeaAssetsResult {
  next: string | null
  previous: string | null
  assets: Array<OpenSeaAssetItem>
}

export const getOpenSeaAssets = async (cursor?: string): Promise<OpenSeaAssetsResult> => {
  // https://docs.opensea.io/reference/getting-assets
  const response = await axios.get<OpenSeaAssetsResult>(`https://api.opensea.io/api/v1/assets`, {
    params: {
      // cursor,
      owner: IDENTITIES.OPENSEA_ETH,
      order_direction: 'desc',
      include_orders: 'false',
      limit: '30',
      format: 'json'
    },
    headers: {
      // https://docs.opensea.io/reference/request-an-api-key
      'x-api-key': ''
    }
  })
  if (response.status === 200) {
    return response.data
  } else {
    throw response.data
  }
}

export const getOpenSeaCollections = async (): Promise<Array<OpenSeaCollection>> => {
  // https://docs.opensea.io/reference/retrieving-collections
  const response = await axios.get<Array<OpenSeaCollection>>(
    `https://api.opensea.io/api/v1/collections`,
    {
      params: {
        asset_owner: IDENTITIES.OPENSEA_ETH,
        limit: '300',
        format: 'json'
      },
      headers: {
        // https://docs.opensea.io/reference/request-an-api-key
        'x-api-key': ''
      }
    }
  )
  if (response.status === 200) {
    return response.data
  } else {
    throw response.data
  }
}
