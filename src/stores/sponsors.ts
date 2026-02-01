/**
 * @file Sponsors store
 * @module store/sponsors
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { createFetchStore } from './_fetch'
import type { GitHubSponsorsResponse } from '/@/server/getters/github'
import { TunnelModule } from '/@/constants/tunnel'
import tunnel from '/@/services/tunnel'

export const useGitHubSponsorsStore = defineStore('githubSponsors', () => {
  return createFetchStore<GitHubSponsorsResponse | null>({
    fetcher: () => tunnel.fetch<GitHubSponsorsResponse>(TunnelModule.GitHubSponsors),
    once: true,
    data: null
  })
})
