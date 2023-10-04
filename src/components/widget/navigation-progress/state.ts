import { ref, computed, nextTick } from 'vue'

export type NavigationProgress = ReturnType<typeof createNavigationProgress>

export interface NavigationProgressOptions {
  duration?: number
  throttle?: number
}

const defaultOptions: Required<NavigationProgressOptions> = {
  duration: 3000,
  throttle: 200
}

// MARK: coupling with CSS transition duration
const CSS_HIDDEN_TRANSITION_DURATION = 200

// https://router.vuejs.org/guide/advanced/navigation-guards.html#The-Full-Navigation-Resolution-Flow
export const createNavigationProgress = (options?: NavigationProgressOptions) => {
  const duration = options?.duration ?? defaultOptions.duration
  const throttle = options?.throttle ?? defaultOptions.throttle

  const progress = ref(0)
  const isLoading = ref(false)
  const step = computed(() => 10000 / duration)

  let _timer: any = null
  let _throttle: any = null

  const _increase = (num: number) => {
    progress.value = Math.min(100, progress.value + num)
  }

  const _startTimer = () => {
    _timer = setInterval(() => {
      _increase(step.value)
    }, 100)
  }

  const clear = () => {
    clearInterval(_timer)
    clearTimeout(_throttle)
    _timer = null
    _throttle = null
  }

  const _hide = () => {
    clear()
    setTimeout(() => {
      isLoading.value = false
      nextTick().then(() => {
        setTimeout(() => {
          progress.value = 0
        }, CSS_HIDDEN_TRANSITION_DURATION)
      })
    }, 360)
  }

  const start = () => {
    clear()
    progress.value = 0
    isLoading.value = true
    if (throttle) {
      _throttle = setTimeout(() => _startTimer(), throttle)
    } else {
      _startTimer()
    }
  }

  const finish = () => {
    progress.value = 100
    _hide()
  }

  return {
    isLoading,
    progress,
    start,
    finish,
    clear
  }
}
