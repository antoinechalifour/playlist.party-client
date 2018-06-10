import { combineReducers } from 'redux'
import guests, * as fromGuests from './guests'
import party, * as fromParty from './party'
import player, * as fromPlayer from './player'
import tracks, * as fromTracks from './tracks'

export default combineReducers({
  guests,
  party,
  player,
  tracks
})

export const getAccessToken = state => fromParty.getAccessToken(state.party)

export const getParty = state => fromParty.getParty(state.party)

export const getGuest = id => state => fromGuests.getGuest(state.guests, id)

export const isBattleFull = state => fromTracks.isBattleFull(state.tracks)

export const getContenders = state => fromTracks.getContenders(state.tracks)

export const isPlayerAvailable = state =>
  fromPlayer.isPlayerAvailable(state.player)

export const getProgress = state => fromPlayer.getProgress(state.player)

export const isPlaying = state => fromPlayer.isPlaying(state.player)

export const getCurrentTrack = state => fromPlayer.getCurrentTrack(state.player)

export const getCurrentAlbum = state => fromPlayer.getCurrentAlbum(state.player)

export const getCurrentArtists = state =>
  fromPlayer.getCurrentArtists(state.player)
