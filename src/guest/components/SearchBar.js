import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import debounce from 'debounce'
import MdAccountCirle from 'react-icons/lib/md/account-circle'
import { withApi } from 'guest/components/providers/ApiProvider'
import Suggestions from 'guest/components/Suggestions'
import DelayedLoader from 'guest/components/DelayedLoader'

const Outer = styled.div`
  position: relative;
`

const Nav = styled.nav`
  display: flex;
  align-items: center;

  background: #313131;
  color: #fff;
  padding: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .25);
`

const ProfileIcon = styled(MdAccountCirle)`
  cursor: pointer;
  font-size: 24px;
  margin-right: 12px;
`

const SearchInput = styled.input`
  flex: 1;

  box-sizing: border-box;
  display: block;
  background: none;
  border: none;
  outline: none;
  width: 100%;
  padding: 4px 0;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  border-bottom: 1px solid rgba(255, 255, 255, .65);
`

const LoaderContainer = styled.div`
  position: relative;
  top: 100%;
  left: 0;
  right: 0;

  padding: 12px;
  background: #313131;
`

class SearchBar extends Component {
  static propTypes = {
    onProfileClick: PropTypes.func.isRequired,
    api: PropTypes.shape({
      searchTracks: PropTypes.func.isRequired,
      submitTrack: PropTypes.func.isRequired
    }).isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      isLoading: false,
      search: '',
      suggestions: null
    }

    this.searchTracks = debounce(this.searchTracks, 1000)
  }

  onSearchChange = e => {
    const search = e.target.value
    this.setState({ search })

    if (search.length > 2) {
      this.searchTracks(search)
    } else {
      this.setState({ suggestions: null })
    }
  }

  searchTracks = async query => {
    this.setState({ isLoading: true })
    const results = await this.props.api.searchTracks(query)

    this.setState({ suggestions: results, isLoading: false })
  }

  onTrackClick = track => {
    this.setState({ search: '', suggestions: null })
    this.props.api.submitTrack(track.id)
  }

  render () {
    return (
      <Outer>
        <Nav>
          <ProfileIcon onClick={this.props.onProfileClick} />
          <SearchInput
            value={this.state.search}
            onChange={this.onSearchChange}
            placeholder='Search tracks...'
          />
        </Nav>
        {this.state.isLoading &&
          <LoaderContainer>
            <DelayedLoader message='Fetching suggestions from Spotify...' />
          </LoaderContainer>}
        {this.state.suggestions &&
          <Suggestions
            tracks={this.state.suggestions}
            onTrackClick={this.onTrackClick}
          />}
      </Outer>
    )
  }
}

export default withApi(SearchBar)
