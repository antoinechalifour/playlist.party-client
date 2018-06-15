import React from 'react'
import PropTypes from 'prop-types'
import qs from 'querystring'
import { Redirect } from 'react-router-dom'

export default function App ({ history, location }) {
  const hash = location.hash.substr(1)
  const params = new window.URLSearchParams(hash)

  const accessToken = params.get('access_token')
  const party = qs.parse(params.get('state'))

  const hostParams = {
    party: party.party,
    code: party.code,
    accessToken
  }

  return <Redirect to={`/host?${qs.stringify(hostParams)}`} />
}

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired
  }).isRequired
}
