import React, { Component } from 'react'
import debounce from 'debounce'
import styled from 'styled-components'

const Wrapper = styled.div`
  background: #151515;
  color: #fff;
  position: relative;
`

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  color: #fff;
  width: 100%;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  background: none;
  border: none;
  padding: 12px;

  ::placeholder {
    color: #fff;
    opacity: .5;
  }
`

const Suggestions = styled.ul`
  position: absolute;
  z-index: 10;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 12px;
  color: #373d3f;
  max-height: 300px;
  overflow-y: scroll;

  > li {
    padding: 6px;
  }

  > li + li {
    border-top: 1px solid rgba(0, 0, 0, .1);
  }
`

export default class SearchBar extends Component {
  state = {
    search: '',
    suggestions: []
  }

  constructor (props) {
    super(props)

    this._searchSuggestions = debounce(this._searchSuggestions, 200)
  }

  _searchSuggestions = value => {
    this.props.channel.emit(
      'search',
      { q: value },
      ({ results: suggestions }) => this.setState({ suggestions })
    )
  }

  _submitTrack = trackId => {
    this.setState({ suggestions: [], search: '' })
    this.props.channel.emit('queue/add', { trackId })
  }

  _onChange = e => {
    const value = e.target.value

    this.setState({ search: e.target.value })

    if (value === '') {
      this.setState({ suggestions: [] })
    } else {
      this._searchSuggestions(value)
    }
  }

  render () {
    return (
      <Wrapper>
        <Input
          type='text'
          value={this.state.search}
          placeholder='Add your favorite track!'
          onChange={this._onChange}
        />

        {this.state.suggestions.length > 0 &&
          <Suggestions>
            {this.state.suggestions.map(x => (
              <li key={x.id} onClick={() => this._submitTrack(x.id)}>
                <div>{x.name}</div>
                <div>{x.artists.map(y => y.name).join(', ')}</div>
              </li>
            ))}
          </Suggestions>}
      </Wrapper>
    )
  }
}
