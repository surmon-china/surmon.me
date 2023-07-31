/**
 * @file Slogan consoler
 * @module effect.slogan
 * @author Surmon <https://github.com/surmon-china>
 */

export const consoleSlogan = (slogan: string, email?: string) => {
  console.log(`%c${slogan} %c${email || ''}`, 'color:#666;font-size:3em;', 'color:#666;font-size:13px;')
}
