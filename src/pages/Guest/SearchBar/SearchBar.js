import React, { Component } from 'react'
import debounce from 'debounce'

export default class SearchBar extends Component {
  state = {
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
    this.props.channel.emit('queue/add', { trackId })
  }

  render () {
    return (
      <div>
        <input
          type='text'
          onChange={e => this._searchSuggestions(e.target.value)}
        />

        <ul>
          {this.state.suggestions.map(x => (
            <li onClick={() => this._submitTrack(x.id)}>
              {x.name} by {x.artists.map(y => y.name).join(', ')}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
