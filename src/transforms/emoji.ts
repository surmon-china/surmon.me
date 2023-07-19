/**
 * @file emoji
 * @author Surmon <https://github.com/surmon-china>
 */

// offset between uppercase ascii and regional indicator symbols
const OFFSET = 127397

// https://github.com/danalloway/react-country-flag/blob/main/src/index.tsx
export const countryCodeToEmoji = (countryCode: string): string => {
  return countryCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + OFFSET))
}
