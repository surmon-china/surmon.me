
// import { HelmetComputedData } from './constant'

// export type Helme = ReturnType<typeof getHelmet>
// export const getHelmet = (state: any) => {
//   return {
//     // 设置新的值
//     set(): void {

//     },
//     clear(): void {
//       // state
//     },
//     // 重置所有至默认值
//     reset(): void {
//       Object.keys(state).forEach(key => {
//         // @ts-ignore
//         state[key] = initState[key]
//       })
//     },
//     // 刷新 DOM
//     refresh(): void {},
//     // 暂停自动更新
//     pause() {

//     },
//     // 重新开始自动更新
//     resume(): void {

//     },
//     get state() {
//       return { ...state }
//     },
//     get html() {
//       return {
//         title: `<title>${state.title}</title>`,
//         // meta: state.meta.map(meta => `<meta >`)
//       }
//       // htmlAttributes: {},
//       // bodyAttributes: {},
//       // meta: [],
//       // link: [],
//       // style: [],
//       // script: [],
//       // noscript: ''
//     },
//     // 应该支持响应式的值
//     title(title: string | (() => string)) {
//       if (state) {
//         if (typeof title === 'string') {
//           state.title = title
//         } else {
//           state.title = computed(title)
//         }
//       }
//     }
//   }
// }

