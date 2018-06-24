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

export const isPartyReady = state => fromParty.isPartyReady(state.party)

export const isPartyLocked = state => fromParty.isPartyLocked(state.party)

export const isPartyOver = state => fromParty.isPartyOver(state.party)

export const getPartyStatus = state => fromParty.getPartyStatus(state.party)

export const getGuest = (state, id) => fromGuests.getGuest(state.guests, id)

export const getGuests = state => fromGuests.getGuests(state.guests)

export const getAllChannels = state => fromGuests.getAllChannels(state.guests)

export const isBattleFull = state => fromTracks.isBattleFull(state.tracks)

export const getContenders = state => fromTracks.getContenders(state.tracks)

export const getNextContenders = state =>
  fromTracks.getNextContenders(state.tracks)

export const getQueue = state => fromTracks.getQueue(state.tracks)

export const getVoteProgress = (trackId, state) =>
  fromTracks.getVoteProgress(trackId, state.tracks)

export const getTracksSummary = state =>
  fromTracks.getTracksSummary(state.tracks)

export const getPlayer = state => fromPlayer.getPlayer(state.player)

export const isPlayerAvailable = state =>
  fromPlayer.isPlayerAvailable(state.player)

export const getPosition = state => fromPlayer.getPosition(state.player)

export const getDuration = state => fromPlayer.getDuration(state.player)

export const getProgress = state => fromPlayer.getProgress(state.player)

export const isPlaying = state => fromPlayer.isPlaying(state.player)

export const getCurrentTrack = state => fromPlayer.getCurrentTrack(state.player)

export const getCurrentAlbum = state => fromPlayer.getCurrentAlbum(state.player)

export const getCurrentArtists = state =>
  fromPlayer.getCurrentArtists(state.player)

export const getBestDJs = state => {
  const scores = getGuests(state).map(guest => {
    let score = 0

    state.tracks.previous.forEach(battle => {
      battle.forEach(track => {
        if (track.role === 'winner' && track.submittedBy === guest.id) {
          score += 1
        }
      })
    })

    return {
      id: guest.id,
      name: guest.name,
      score
    }
  })

  return scores.sort((a, b) => b.score - a.score)
}
