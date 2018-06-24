import { combineReducers } from 'redux'
import * as actions from '../actions/tracks'

function previous (state = [], action) {
  switch (action.type) {
    case actions.ADD_TO_PREVIOUS:
      return [...state, action.tracks]

    default:
      return state
  }
}

function next (state = [], action) {
  switch (action.type) {
    case actions.ADD_TO_BATTLE:
      return [...state, { ...action.track, votes: [] }]

    case actions.ADD_TO_PREVIOUS:
      return state.filter(x => {
        const isInPrevious = action.tracks.find(y => y.id === x.id)

        return !isInPrevious
      })

    case '@guest/battle/vote':
      return [
        ...state.map(x => {
          const filteredVotes = x.votes.filter(x => x !== action.guestId)

          if (x.id === action.payload.trackId) {
            return {
              ...x,
              votes: [...filteredVotes, action.guestId]
            }
          } else {
            return {
              ...x,
              votes: filteredVotes
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

export const getQueue = state => state.queue

export const getVoteProgress = (trackId, state) => {
  const contenders = getContenders(state)
  const totalVotes = contenders.reduce(
    (sum, track) => sum + track.votes.length,
    0
  )

  if (totalVotes === 0) {
    return 0.5
  }

  const track = contenders.find(x => x.id === trackId)

  return track.votes.length / totalVotes
}

export const getTracksSummary = state => {
  const battles = state.previous

  return battles.map(tracks => {
    const totalVotes = tracks.reduce(
      (sum, track) => sum + track.votes.length,
      0
    )

    return tracks.map(track => {
      const approvalRate = totalVotes === 0
        ? 0.5
        : track.votes.length / totalVotes
      return {
        id: track.id,
        name: track.name,
        album: track.album,
        artists: track.artists,
        approvalRate,
        isWinner: track.role === 'winner'
      }
    })
  })
}
