/**
 * @file BFF GitHub getter
 * @module server.getter.github
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from '@/server/services/axios'
import { IDENTITIES } from '@/config/app.config'
import { GITHUB_BEARER_TOKEN } from '@/config/bff.yargs'

const graphqlGitHub = <T = any>(query: string): Promise<T> => {
  return axios
    .request<any>({
      // https://github.com/settings/tokens
      headers: { Authorization: `bearer ${GITHUB_BEARER_TOKEN}` },
      url: `https://api.github.com/graphql`,
      method: 'POST',
      data: JSON.stringify({
        query: `query {
        user(login: "${IDENTITIES.GITHUB_USER_NAME}") {
          ${query}
        }
      }`
      })
    })
    .then((response) => {
      return response.data.errors
        ? Promise.reject(response.data.errors.map((error) => error.message).join('; '))
        : Promise.resolve(response.data.data.user)
    })
}

export interface GitHubSponsorUser {
  login: string
  name: string
  url: string
  avatarUrl: string
  websiteUrl: string
}

export interface GitHubSponsorsResponse {
  sponsorsActivities: {
    nodes: Array<null | {
      action: string
      sponsorsTier: {
        isOneTime: boolean
      }
      sponsor: GitHubSponsorUser
    }>
  }
  sponsors: {
    totalCount: number
    edges: Array<{
      node: GitHubSponsorUser
    }>
  }
}

export const getGitHubSponsors = () => {
  const SPONSOR_NODE_QUERY = `
    ... on User {
      login
      name
      url
      avatarUrl
      websiteUrl
    }
    ... on Organization {
      login
      name
      url
      avatarUrl
      websiteUrl
    }
  `

  // https://github.com/orgs/community/discussions/37234#discussioncomment-4047906
  // https://github.com/dohooo/get-past-sponsors
  // https://github.com/community/community/discussions/3818#discussioncomment-2155340
  // https://docs.github.com/en/graphql/reference/objects#sponsorsactivity
  // https://docs.github.com/en/graphql/reference/enums#sponsorsactivityaction
  return graphqlGitHub(`
    sponsorsActivities(first:100, period: ALL, orderBy: { direction: DESC, field: TIMESTAMP }, actions: [NEW_SPONSORSHIP, CANCELLED_SPONSORSHIP]) {
      nodes {
        action,
        sponsorsTier {
          isOneTime
        },
        sponsor {
          ${SPONSOR_NODE_QUERY}
        }
      }
    },
    sponsors(first: 100) {
      totalCount
      edges {
        node {
          ${SPONSOR_NODE_QUERY}
        }
      }
    }
  `)
}

const isISODateString = (dateString: string) => {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(dateString)) return false
  return new Date(dateString).toISOString() === dateString
}

export const getGitHubContributions = async (from: string, to: string): Promise<any> => {
  if (!isISODateString(from) || !isISODateString(to)) {
    return Promise.reject('Invalid date string!')
  }

  const result = await graphqlGitHub(`
    contributionsCollection(from: "${from}", to: "${to}") {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            weekday
            date
            contributionCount
            color
          }
        }
      }
    }
  `)

  return result.contributionsCollection.contributionCalendar
}
