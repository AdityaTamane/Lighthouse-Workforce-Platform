import { useEffect } from 'react'

// Overlays nest (a modal opened from a drawer), so count them and only
// release the page once the last one closes.
let locks = 0

/**
 * Freeze background page scroll while an overlay is open.
 *
 * On phones the app scrolls the document (not a nested container), so without
 * this the page behind a modal scrolls under your finger and ends up somewhere
 * else once the modal closes.
 */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    locks += 1
    document.documentElement.classList.add('overlay-open')
    return () => {
      locks -= 1
      if (locks === 0) document.documentElement.classList.remove('overlay-open')
    }
  }, [active])
}
