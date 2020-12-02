// TODO: https://github.com/skovy/typed-scss-modules

interface ICSSModuleExport {
  [className: string]: string
}

declare const cssModuleExport: ICSSModuleExport

declare module '*.scss' {
  export = cssModuleExport
}
