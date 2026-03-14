export const getMarkdownSplitIndex = (markdown: string, index: number) => {
  const shortContent = markdown.substring(0, index)
  // breakpoint priority: H5 > H4 > H3 > \n\n\n
  const lastH5Index = shortContent.lastIndexOf('\n##### ')
  const lastH4Index = shortContent.lastIndexOf('\n#### ')
  const lastH3Index = shortContent.lastIndexOf('\n### ')
  const lastLineIndex = shortContent.lastIndexOf('\n\n\n')
  const splitIndex = Math.max(lastH5Index, lastH4Index, lastH3Index, lastLineIndex)
  // console.log('- content length', contentLength.value, index, splitIndex)
  return splitIndex
}
