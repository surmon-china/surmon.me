
import { OriginState } from '/@/constants/state'

export const isOriginal = (originState: OriginState) => originState === OriginState.Original
export const isHybrid = (originState: OriginState) => originState === OriginState.Hybrid
export const isReprint = (originState: OriginState) => originState === OriginState.Reprint

export const getExtendsValue = (target: any, key: string) => {
  if (!target?.extends?.length) {
    return null
  }
  const targetExtend = target.extends.find(t => t.name === key)
  return targetExtend ? targetExtend.value : null
}
