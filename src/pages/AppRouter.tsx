import { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import routes from './routes'

export type Props = {
  children?: JSX.Element
}
function AppRouter({ children }: Props): JSX.Element {
  return (
    <Router>
      {children}
      <Switch>
        <Suspense fallback="loading...">
          {routes.map(({ component, ...rest }) => (
            <Route component={component} key={rest.path} {...rest} />
          ))}
        </Suspense>
      </Switch>
    </Router>
  )
}

export default AppRouter
