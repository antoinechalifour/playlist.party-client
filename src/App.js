import qs from 'querystring'
import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import SpotifyApiFactory from 'core/network/spotifyApi'
import theme from 'core/theming/theme'
import Home from 'core/components/pages/Home'
import { SocketProvider } from 'core/components/providers/Socket'
import HostApp from 'host/App'
import Host from 'host/domain/Host'
import { HostProvider } from 'host/components/providers/Host'
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
                  const spotify = SpotifyApiFactory({ accessToken })
                  const host = new Host({ party, code, accessToken, spotify })

                  return (
                    <HostProvider host={host}>
                      <HostApp />
                    </HostProvider>
                  )
                }}
              />
              <Route
                path='/guest'
                render={({ location }) => {
                  const { party, code } = getQueryParams(location.search)
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
