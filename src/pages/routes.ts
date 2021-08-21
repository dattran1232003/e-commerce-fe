import { IRouteProps } from '@/commons/interfaces/RouteProps.interface'

// require all component/route.ts files
const context = require.context('.', true, /route.(ts|tsx)$/)

const routes: IRouteProps[] = context
  .keys()
  .map((path) => require(`${path}`).default)

export default routes
