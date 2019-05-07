/**
 * @file Api config / ES module
 * @module api.config
 * @author Surmon <https://github.com/surmon-china>
 */

import apiJson from './api.json'
import { NODE_ENV } from '~/environment/esm'

const apis = apiJson[NODE_ENV]

export default apis
export const { cdnUrl, proxyUrl, baseUrl, socketHost } = apis
