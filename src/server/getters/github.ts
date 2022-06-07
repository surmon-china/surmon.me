/**
 * @file BFF GitHub getter
 * @module server.getter.github
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from 'axios'
import { IDENTITIES } from '@/config/app.config'
import { GITHUB_BEARER_TOKEN } from '@/config/bff.argv'

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

export const getGitHubSponsors = async () => {
  const result = await graphqlGitHub(`
    sponsors(first: 100) {
      totalCount
      edges {
        node {
          ... on User {
            login
            name
            company
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
        }
      }
    }
  `)

  return result.sponsors
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
