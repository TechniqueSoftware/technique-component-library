import { useEffect } from 'react'

export const useClickOutside = (ref, handler, exludeCloseClass) => {
  useEffect(() => {
    const listener = event => {
      const isExcluded = exludeCloseClass && exludeCloseClass.some(excludeClass => !!event.target.closest(excludeClass))
      if (!ref.current || ref.current.contains(event.target) || isExcluded) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [])
}
