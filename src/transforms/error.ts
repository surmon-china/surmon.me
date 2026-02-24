/**
 * @file Error transform
 * @module transform/error
 * @author Surmon <https://github.com/surmon-china>
 */

export function getMessageFromNormalError(error: any): any {
  return error?.message || error
}
