/**
 * @file emoji
 * @author Surmon <https://github.com/surmon-china>
 */

// offset between uppercase ascii and regional indicator symbols
const OFFSET = 127397

// https://github.com/danalloway/react-country-flag/blob/main/src/index.tsx
export const regionCodeToEmoji = (regionCode: string): string => {
  return regionCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + OFFSET))
}

export const emojiToDataURL = (emoji: string, size = 100): string => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
      <text 
        x="50%" 
        y="50%" 
        text-anchor="middle" 
        dominant-baseline="central" 
        font-size="${size * 0.8}" 
      >${emoji}</text>
    </svg>
  `.trim()

  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
