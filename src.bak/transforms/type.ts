/**
 * @file Type transformer
 * @module transformer/type
 * @author Surmon <https://github.com/surmon-china>
 */

export type WithoutInstallStore<S> = S extends Plugin
  ? Omit<S, 'install'>
  : S
