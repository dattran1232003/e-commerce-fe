import { useHistory } from 'react-router-dom'

export type PrevPathMethods = {
  goBack: (defaultPath?: string) => void
  setPrevPath: (pathname?: string) => void
  getPrevPath: (defaultPath?: string) => string
}

export const usePersistPrevPath = (): PrevPathMethods => {
  const history = useHistory()

  const KEY = 'PREV_URL'
  const storage = sessionStorage || window.sessionStorage

  function getPrevPath(defaultPath?: string) {
    const pathname = storage.getItem(KEY)
    return pathname || defaultPath || '/'
  }

  /**
   * Store prevPath into storage to go back
   */
  function setPrevPath(pathname?: string) {
    storage.setItem(KEY, pathname || window.location.pathname)
  }

  /**
   * Redirect to the prevPath (set by setPrevPath() function),
   * redirect priority: prevPath > default pathname > root ('/')
   */
  function goBack(defaultPath?: string) {
    const pathname = getPrevPath(defaultPath)
    history.push(pathname)
  }

  return { goBack, getPrevPath, setPrevPath }
}
