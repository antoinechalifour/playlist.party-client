import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import theme from './theme'
import Home from './pages/Home'
import Host from './pages/Host'
import Guest from './pages/Guest'
import { HostContextProvider } from './components/HostContext'
import { SocketProvider } from './components/SocketContext'
import { GuestProvider } from './components/GuestContext'

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
                render={() => (
                  <HostContextProvider>
                    <Host />
                  </HostContextProvider>
                )}
              />
              <Route
                path='/guest'
                render={() => (
                  <GuestProvider>
                    <Guest />
                  </GuestProvider>
                )}
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
