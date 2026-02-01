/**
 * @file Databse extra transformer
 * @module transform/extra
 * @author Surmon <https://github.com/surmon-china>
 */

import _isNil from 'lodash-es/isNil'
import { ExtraKeyValue } from '/@/interfaces/extra'

export const getExtrasMap = (kvs: ExtraKeyValue[] | void): Map<string, string> => {
  return new Map((kvs ?? []).map((item) => [item.key, item.value]))
}
