import qs from 'querystring'
import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import theme from './theme'
import Home from './pages/Home'
import Host from './pages/Host'
import Guest from './pages/Guest'
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
              <Route path='/home' component={Home} />
              <Route
                path='/host'
                render={({ location }) => {
                  const { party, accessToken, code } = getQueryParams(
                    location.search
                  )
                  const props = { party, accessToken, code }

                  return (
                    <HostProvider {...props}>
                      <Host />
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
                      <Guest />
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
