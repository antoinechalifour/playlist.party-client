import qs from 'querystring'
import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import theme from 'core/theming/theme'
import Home from 'core/components/pages/Home'
import { SocketProvider } from 'core/components/providers/Socket'
import HostApp from 'host/App'
import GuestApp from 'guest/App'
import { GuestProvider } from 'guest/components/providers/Guest'

const getQueryParams = search => qs.parse(search.substr(1))

class App extends Component {
  render () {
    return (
      <SocketProvider socket={this.props.socket}>
        <ThemeProvider theme={theme}>
          <BrowserRouter className='App'>
            <Switch>
              <Route path='/home' component={Home} />
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
