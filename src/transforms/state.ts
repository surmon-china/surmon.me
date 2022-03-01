/**
 * @file App state transformer
 * @module transformer.state
 * @author Surmon <https://github.com/surmon-china>
 */

import { UNDEFINED, isNull, isUndefined } from '/@/constants/value'
import { OriginState, UniversalKeyValue } from '/@/constants/state'

export const isOriginalType = (originState?: OriginState) => {
  return isNull(originState) || isUndefined(null) || originState === OriginState.Original
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
  return kvs.length ? getExtendsObject(kvs)[key] : UNDEFINED
}
