import React from 'react'
import PropTypes from 'prop-types'
import { ApiProvider } from 'guest/components/providers/ApiProvider'
import Home from 'guest/components/Home'

export default function App ({ party, code }) {
  return (
    <ApiProvider party={party} code={code}>
      <Home />
    </ApiProvider>
  )
}

App.propTypes = {
  party: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired
}
