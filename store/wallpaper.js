/**
 * @file wallpaper / ES module
 * @module store/wallpaper
 * @author Surmon <https://github.com/surmon-china>
 */

export const state = () => {
  return {
    papers: {
      fetching: false,
      data: null
    },
    story: {
      fetching: false,
      data: null
    }
  }
}

export const mutations = {
  REQUEST_WALLPAPERS(state) {
    state.papers.fetching = true
  },
  REQUEST_WALLPAPERS_SUCCESS(state, action) {
    state.papers.fetching = false
    state.papers.data = action.result
  },
  REQUEST_WALLPAPERS_FAILURE(state) {
    state.papers.fetching = false
    state.papers.data = null
  },
  REQUEST_STORY(state) {
    state.story.fetching = true
  },
  REQUEST_STORY_SUCCESS(state, action) {
    state.story.fetching = false
    state.story.data = action.result
  },
  REQUEST_STORY_FAILURE(state) {
    state.story.fetching = false
    state.story.data = null
  }
}
