import { combineReducers } from 'redux'
import * as actions from '../actions/tracks'

function previous (state = [], action) {
  switch (action.type) {
    case actions.ADD_TO_PREVIOUS:
      return [...state, action.track]

    default:
      return state
  }
}

function next (state = [], action) {
  switch (action.type) {
    case actions.ADD_TO_BATTLE:
      return [...state, { ...action.track, votes: [] }]

    case actions.ADD_TO_PREVIOUS:
      return state.filter(x => x.id !== action.track.id)

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
  queue
})

export default tracksReducer

export const isBattleFull = state => state.next.length === 2

export const getContenders = state => state.next

export const getNextContenders = state =>
  state.queue.slice(0, 2).filter(Boolean)

export const getVoteProgress = (trackId, state) => {
  const contenders = getContenders(state)
  const totalVotes = contenders.reduce(
    (sum, track) => sum + track.votes.length,
    0
  )

  if (totalVotes === 0) {
    return 1
  }

  const track = contenders.find(x => x.id === trackId)

  return track.votes.length / totalVotes
}
