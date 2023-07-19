/**
 * @file Value constant
 * @module constant.value
 * @author Surmon <https://github.com/surmon-china>
 */

export const NULL = null
export const UNDEFINED = void 0

export const isNull = (value): value is null => value === NULL
export const isUndefined = (value): value is void => value === UNDEFINED
export const isNil = (value): value is null | void => isNull(value) || isUndefined(value)
