import { combineReducers } from 'redux'
import guests, * as fromGuests from './guests'
import party, * as fromParty from './party'
// import player from './player'
import tracks, * as fromTracks from './tracks'

export default combineReducers({
  guests,
  party,
  // player,
  tracks
})

export const getAccessToken = state => fromParty.getAccessToken(state.party)

export const getParty = state => fromParty.getParty(state.party)

export const getGuest = id => state => fromGuests.getGuest(state.guests, id)

export const isBattleFull = state => fromTracks.isBattleFull(state.tracks)
