import qs from 'querystring'
import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import theme from 'core/theming/theme'
import Loadable from 'react-loadable'
import { SocketProvider } from 'core/components/providers/Socket'
import { GuestProvider } from 'guest/components/providers/Guest'

const getQueryParams = search => qs.parse(search.substr(1))

const HomeApp = Loadable({
  loader: () => import('core/components/pages/Home'),
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

class App extends Component {
  render () {
    return (
      <SocketProvider socket={this.props.socket}>
        <ThemeProvider theme={theme}>
          <BrowserRouter className='App'>
            <Switch>
              <Route path='/home' component={HomeApp} />
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
                      socket={this.props.socket}
                    />
                  )
                }}
              />
              <Route
                path='/:party/:code'
                render={({ match, ...rest }) => {
                  const { party, code } = match.params
                  const props = { party, code }

                  return (
                    <GuestProvider {...props}>
                      <GuestApp />
                    </GuestProvider>
                  )
                }}
              />
              <Redirect from='/' to='/home' />
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </SocketProvider>
    )
  }
}

export default App
