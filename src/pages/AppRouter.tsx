import { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import routes from './routes'

function AppRouter(): JSX.Element {
  return (
    <Router>
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
