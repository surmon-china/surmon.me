
export type WithoutInstallStore<S> = S extends Plugin
  ? Omit<S, 'install'>
  : S
