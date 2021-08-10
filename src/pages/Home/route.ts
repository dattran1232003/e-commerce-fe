import { lazy } from 'react'

export default {
  exact: true,
  path: '/',
  public: true,
  component: lazy(() => import('./Home')),
}
