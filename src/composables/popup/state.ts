import { readonly, reactive, shallowRef, nextTick } from 'vue'

interface PopupCoreState {
  visible: boolean
  maskClosable: boolean
  scrollClosable: boolean
  isMedia: boolean
}

type PopupCoreOptions = Pick<PopupCoreState, 'maskClosable' | 'scrollClosable'>

type PopupMediaType = 'image' | 'video'

export interface PopupMediaState {
  type: PopupMediaType | null
  src: string | null
  attrs: Record<string, string> | null
}

export const DEFAULT_POPUP_STATE: PopupCoreState = Object.freeze({
  visible: false,
  maskClosable: true,
  scrollClosable: true,
  isMedia: false
})

const DEFAULT_MEDIA_STATE: PopupMediaState = Object.freeze({
  type: null,
  src: null,
  attrs: null
})

export const createPopupState = () => {
  const container = shallowRef<HTMLElement>()
  const coreStates = reactive({ ...DEFAULT_POPUP_STATE })
  const mediaStates = reactive({ ...DEFAULT_MEDIA_STATE })

  const setRootContainer = (element: HTMLElement) => {
    container.value = element
  }

  const hidden = (callback?: () => void) => {
    if (!coreStates.visible) {
      callback?.()
      return
    }
    Object.assign(coreStates, { ...DEFAULT_POPUP_STATE })
    Object.assign(mediaStates, { ...DEFAULT_MEDIA_STATE })
    if (callback) {
      nextTick(callback)
    }
  }

  const vModal = (options?: Partial<PopupCoreOptions>) => {
    hidden(() => {
      Object.assign(coreStates, {
        ...options,
        visible: true,
        isMedia: false
      })
    })
  }

  const vMedia = (
    type: PopupMediaType,
    src: string,
    attrs?: Record<string, string>,
    options?: Partial<PopupCoreOptions>
  ) => {
    hidden(() => {
      mediaStates.type = type
      mediaStates.src = src
      mediaStates.attrs = attrs ?? null
      Object.assign(coreStates, {
        ...options,
        visible: true,
        isMedia: true
      })
    })
  }

  const image = (src: string, attrs?: Record<string, string>, options?: Partial<PopupCoreOptions>) => {
    vMedia('image', src, attrs, options)
  }

  const video = (src: string, attrs?: Record<string, string>, options?: Partial<PopupCoreOptions>) => {
    vMedia('video', src, attrs, options)
  }

  return {
    hidden,
    vModal,
    vMedia,
    image,
    video,
    state: readonly(coreStates),
    media: readonly(mediaStates),
    container: readonly(container),
    $setRootContainer: setRootContainer
  }
}
