/**
 * @file BFF Zhihu getter
 * @module server.getter.zhihu
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from '@/server/services/axios'
import { IDENTITIES } from '@/config/app.config'
import { ZHIHU_COOKIE } from '@/config/bff.yargs'

export interface ZhihuAnswerItem {
  id: number
  url: string
  type: string
  content: string
  excerpt: string
  admin_closed_comment: boolean
  reaction_instruction: Record<string, unknown>
  biz_ext: {
    creation_relationship: Record<string, unknown>
  }
  updated_time: number
  voteup_count: number
  collapse_reason: string
  is_labeled: boolean
  author: {
    avatar_url_template: string
    badge_v2: {
      icon: string
      detail_badges: any[]
      night_icon: string
      merged_badges: any[]
      title: string
    }
    name: string
    headline: string
    gender: number
    user_type: string
    id: string
    is_advertiser: boolean
    avatar_url: string
    url: string
    type: string
    badge: any[]
    url_token: string
    is_org: boolean
  }
  question: {
    relationship: Record<string, unknown>
    title: string
    url: string
    created: number
    updated_time: number
    has_publishing_draft: boolean
    question_type: string
    type: string
    id: number
  }
  comment_count: number
  content_need_truncated: boolean
  reshipment_settings: string
  attachment: {
    attachment_id: string
    type: string
  }
  answer_type: string
  annotation_action: any[]
  collapsed_by: string
  is_copyable: boolean
  is_collapsed: boolean
  is_normal: boolean
  comment_permission: string
  thumbnail: string
  extras: string
  created_time: number
  can_comment: {
    status: boolean
    reason: string
  }
}

export interface ZhihuAnswersResponse {
  data: ZhihuAnswerItem[]
  paging: {
    totals: number
    is_start: boolean
    is_end: boolean
    previous: string
    next: string
  }
}

// According to the documentation, a maximum of 20
const ZHIHU_PAGE_LIMIT = 20
// https://www.zhihu.com/people/<username>/answers
const ZHIHU_INCLUDE_PARAMS = `data[*].is_normal,admin_closed_comment,reward_info,is_collapsed,annotation_action,annotation_detail,collapse_reason,collapsed_by,suggest_edit,comment_count,can_comment,content,attachment,voteup_count,reshipment_settings,comment_permission,created_time,updated_time,review_info,excerpt,paid_info,reaction_instruction,is_labeled,label_info,relationship.is_authorized,voting,is_author,is_thanked,is_nothelp;data[*].vessay_info;data[*].author.badge[?(type=best_answerer)].topics;data[*].author.vip_info;data[*].question.has_publishing_draft,relationship`

// Get answers by member ID
// https://yifei.me/note/460
export const getZhihuAnswers = async (offset = 0) => {
  const api = `https://api.zhihu.com/members/${IDENTITIES.ZHIHU_USER_NAME}/answers`
  const response = await axios.get<ZhihuAnswersResponse>(api, {
    timeout: 8000,
    headers: { cookie: ZHIHU_COOKIE },
    params: {
      offset,
      limit: ZHIHU_PAGE_LIMIT,
      sort_by: 'created',
      include: ZHIHU_INCLUDE_PARAMS
    }
  })

  return response.data
}
