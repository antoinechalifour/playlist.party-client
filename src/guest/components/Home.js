import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withApi } from 'guest/components/providers/ApiProvider'
import LoadingScreen from 'guest/components/LoadingScreen'
import styled from 'styled-components'
import SearchBar from 'guest/components/SearchBar'
import Battle from 'guest/components/Battle'
import UserModal from 'guest/components/UserModal'
import InvalidPasscodeScreen from 'guest/components/InvalidPasscodeScreen'

const Wrapper = styled.div`
  height: 100vh;
  background: #151515;

  display: flex;
  flex-direction: column;
`

class Home extends Component {
  static propTypes = {
    api: PropTypes.shape({
      isConnected: PropTypes.bool.isRequired,
      rename: PropTypes.func.isRequired
    }).isRequired
  }

  state = {
    showUserModal: false
  }

  _showUserModal = () => this.setState({ showUserModal: true })

  _hideUserModal = () => this.setState({ showUserModal: false })

  _saveUsername = username => {
    this._hideUserModal()
    this.props.api.rename(username)
  }

  render () {
    if (this.props.api.signalingError) {
      return <InvalidPasscodeScreen />
    } else if (!this.props.api.isConnected) {
      return <LoadingScreen />
    }

    return (
      <Wrapper>
        <SearchBar onProfileClick={this._showUserModal} />
        <Battle />

        {this.state.showUserModal &&
          <UserModal
            onDismiss={this._hideUserModal}
            onSave={this._saveUsername}
          />}
      </Wrapper>
    )
  }
}

export default withApi(Home)
