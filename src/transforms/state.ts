/**
 * @file App state transformer
 * @module transform/state
 * @author Surmon <https://github.com/surmon-china>
 */

import _isNil from 'lodash-es/isNil'
import { UniversalKeyValue } from '/@/interfaces/common'
import { OriginState } from '/@/constants/biz-state'

export const isOriginalType = (originState?: OriginState) => {
  return _isNil(originState) || originState === OriginState.Original
}

export const isHybridType = (originState: OriginState) => {
  return originState === OriginState.Hybrid
}

export const isReprintType = (originState: OriginState) => {
  return originState === OriginState.Reprint
}

export const getExtendsObject = (kvs: UniversalKeyValue[] | void): { [key: string]: string } => {
  return kvs?.length ? kvs.reduce((v, c) => ({ ...v, [c.name]: c.value }), {}) : {}
}

export const getExtendValue = (kvs: UniversalKeyValue[], key: string) => {
  return kvs.length ? getExtendsObject(kvs)[key] : undefined
}
