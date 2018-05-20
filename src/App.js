import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import theme from './theme'
import Home from './pages/Home'
import Host from './pages/Host'
import { HostContextProvider } from './components/HostContext'

class App extends Component {
  render () {
    return (
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
            <Redirect from='/' to='/home' />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}

export default App
