/**
 * @file ChatGPT url
 * @author Surmon <https://github.com/surmon-china>
 */

// https://help.openai.com/en/articles/7925741-chatgpt-shared-links-faq#h_1ed51a9a7d
export const getChatGPTShareURL = (conversationId: string) => {
  return `https://chat.openai.com/share/${conversationId}`
}
