import { lazy } from 'react'
import { IRouteProps } from '../../commons/interfaces/RouteProps.interface'

export default <IRouteProps>{
  path: '/feed',
  exact: true,
  public: true,
  component: lazy(() => import('./Feed')),
}
