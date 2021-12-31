/**
 * @file App state transformer
 * @module transformer.state
 * @author Surmon <https://github.com/surmon-china>
 */

import { UNDEFINED, isNull, isUndefined } from '/@/constants/value'
import { OriginState, UniversalExtend } from '/@/constants/state'

export const isOriginalType = (originState?: OriginState) => {
  return isNull(originState) || isUndefined(null) || originState === OriginState.Original
}

export const isHybridType = (originState: OriginState) => {
  return originState === OriginState.Hybrid
}

export const isReprintType = (originState: OriginState) => {
  return originState === OriginState.Reprint
}

export const getExtendsObject = (_extends: UniversalExtend[] | void): { [key: string]: string } => {
  return _extends?.length ? _extends.reduce((v, c) => ({ ...v, [c.name]: c.value }), {}) : {}
}

export const getExtendValue = (_extends: UniversalExtend[], key: string) => {
  return _extends.length ? getExtendsObject(_extends)[key] : UNDEFINED
}
