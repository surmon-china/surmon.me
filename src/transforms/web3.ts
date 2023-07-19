/**
 * @file Web3 url
 * @author Surmon <https://github.com/surmon-china>
 */

export const getEtherscanURL = (address: string) => {
  return `https://etherscan.io/address/${address}`
}

export const getOpenSeaCollectionURL = (slug: string) => {
  return `https://opensea.io/collection/${slug}`
}
