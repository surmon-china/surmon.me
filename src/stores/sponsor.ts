/**
 * @file Sponsor state
 * @module store.sponsor
 * @author Surmon <https://github.com/surmon-china>
 */

import { computed } from 'vue'
import { defineStore } from 'pinia'
import { createFetchStore } from './_fetch'
import type { GitHubSponsorsResponse, GitHubSponsorUser } from '/@/server/getters/github'
import { TunnelModule } from '/@/constants/tunnel'
import tunnel from '/@/services/tunnel'

export const useSponsorStore = defineStore('githubSponsor', () => {
  const fetchStore = createFetchStore<GitHubSponsorsResponse | null>({
    fetcher: () => tunnel.dispatch<GitHubSponsorsResponse>(TunnelModule.GitHubSponsors),
    once: true,
    data: null
  })

  const activeSponsors = computed<GitHubSponsorUser[]>(() => {
    return fetchStore.data.value?.sponsors.edges.map((edge) => edge.node) || []
  })

  const inactiveSponsors = computed<GitHubSponsorUser[]>(() => {
    // 1. order by TIMESTAMP/DESC
    // 2. filter out current sponsors
    // 3. the latest user to cancel is at the head of the array
    // 4. no cancellation events for one-time sponsor
    const result: GitHubSponsorUser[] = []
    const activeSponsorLogins = activeSponsors.value.map((item) => item.login)
    fetchStore.data.value?.sponsorsActivities.nodes.forEach((node) => {
      // Recently, GitHub returned the Ghost user as null
      if (node && node.sponsor.login !== 'ghost') {
        if (node.action === 'CANCELLED_SPONSORSHIP' || node.sponsorsTier.isOneTime) {
          if (!activeSponsorLogins.includes(node.sponsor.login)) {
            result.push(node.sponsor)
          }
        }
      }
    })
    return result
  })

  return {
    ...fetchStore,
    activeSponsors,
    inactiveSponsors
  }
})
