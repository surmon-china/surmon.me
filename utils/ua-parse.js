
export default userAgent => ({
  isEdge: userAgent.includes('Edge'),
  isFF: userAgent.includes('Firefox'),
  isOpera: userAgent.includes('Opera'),
  isBB: userAgent.includes('BlackBerry'),
  isChrome: userAgent.includes('Chrome'),
  isMaxthon: userAgent.includes('Maxthon'),
  isIos: /(iPhone|iPad|iPod|iOS)/i.test(userAgent),
  isSafari: userAgent.includes('Safari') && !userAgent.includes('Chrome'),
  isIE: userAgent.includes('compatible') && userAgent.includes('MSIE') && !userAgent.includes('Opera'),
  isMobile: /(iPhone|iPod|Opera Mini|Android.*Mobile|NetFront|PSP|BlackBerry|Windows Phone)/ig.test(userAgent)
})
