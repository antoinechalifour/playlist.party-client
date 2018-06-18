import qs from 'querystring'
import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import theme from 'core/theming/theme'
import Loadable from 'react-loadable'

const getQueryParams = search => qs.parse(search.substr(1))

const HomeApp = Loadable({
  loader: () => import('home/App'),
  loading: () => null
})

const HostApp = Loadable({
  loader: () => import('host/App'),
  loading: () => null
})

const GuestApp = Loadable({
  loader: () => import('guest/App'),
  loading: () => null
})

const OauthApp = Loadable({
  loader: () => import('oauth/App'),
  loading: () => null
})

class App extends Component {
  render () {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter className='App'>
          <Switch>
            <Route path='/home' component={HomeApp} />
            <Route path='/oauth/callback' component={OauthApp} />
            <Route
              path='/host'
              render={({ location }) => {
                const { party, accessToken, code } = getQueryParams(
                  location.search
                )

                return (
                  <HostApp
                    party={party}
                    code={code}
                    accessToken={accessToken}
                  />
                )
              }}
            />
            <Route
              path='/:party/:code'
              render={({ match, ...rest }) => {
                const { party, code } = match.params
                const props = { party, code }

                return <GuestApp {...props} />
              }}
            />
            <Redirect from='/' to='/home' />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}

export default App
