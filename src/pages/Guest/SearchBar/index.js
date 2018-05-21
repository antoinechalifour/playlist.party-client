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
    console.log(value)
  }

  render () {
    return (
      <div>
        <input
          type='text'
          onChange={e => this._searchSuggestions(e.target.value)}
        />
      </div>
    )
  }
}
