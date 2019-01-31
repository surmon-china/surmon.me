/**
 * @file Api config / ES module
 * @module api.config
 * @author Surmon <https://github.com/surmon-china>
 */

import apiJson from './api.json'
import { NODE_ENV } from '~/environment/esm'

const apis = apiJson[NODE_ENV]

export const cdnUrl = apis.cdnUrl
export const proxyUrl = apis.proxyUrl
export const baseUrl = apis.baseUrl
export const socketHost = apis.socketHost

export default { cdnUrl, proxyUrl, baseUrl, socketHost }
