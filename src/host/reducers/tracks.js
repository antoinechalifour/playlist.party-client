import { combineReducers } from 'redux'
import * as actions from '../actions/tracks'

function previous (state = [], action) {
  return state
}

function current (state = null, action) {
  return state
}

function next (state = [], action) {
  switch (action.type) {
    case actions.ADD_TO_BATTLE:
      return [...state, { ...action.track, votes: [] }]

    case '@guest/battle/vote':
      return [
        ...state.map(x => {
          if (x.id === action.payload.trackId) {
            return {
              ...x,
              votes: [...x.votes, action.guestId]
            }
          } else {
            return {
              ...x,
              votes: x.votes.filter(x => x !== action.guestId)
            }
          }
        })
      ]

    default:
      return state
  }
}

function queue (state = [], action) {
  switch (action.type) {
    case actions.ADD_TO_QUEUE:
      return [...state, action.track]

    case actions.ADD_TO_BATTLE:
      return state.filter(x => x.id !== action.track.id)

    default:
      return state
  }
}

const tracksReducer = combineReducers({
  previous,
  next,
  current,
  queue
})

export default tracksReducer

export const isBattleFull = state => state.next.length === 2

export const getContenders = state => state.next
