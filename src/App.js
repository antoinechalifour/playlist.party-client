import qs from 'querystring'
import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import SpotifyApiFactory from 'core/spotifyApi'
import Host from 'core/Host'
import theme from './theme'
import HomePage from './pages/Home'
import HostPage from './pages/Host'
import GuestPage from './pages/Guest'
import { HostProvider } from './components/HostContext'
import { SocketProvider } from './components/SocketContext'
import { GuestProvider } from './components/GuestContext'

const getQueryParams = search => qs.parse(search.substr(1))

class App extends Component {
  render () {
    return (
      <SocketProvider socket={this.props.socket}>
        <ThemeProvider theme={theme}>
          <BrowserRouter className='App'>
            <Switch>
              <Route path='/home' component={HomePage} />
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
                      <HostPage />
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
                      <GuestPage />
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
