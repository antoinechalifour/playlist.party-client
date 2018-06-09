import * as actions from '../actions/player'

export default function playerReducer (state = null, action) {
  switch (action.type) {
    case actions.UPDATE_PLAYER_STATE:
      return action.state

    default:
      return state
  }
}

export const isPlayerAvailable = state => state !== null

export const getProgress = state => state.position / state.duration

export const isPlaying = state => !state.paused

export const getCurrentTrack = state => ({
  id: state.track_window.current_track.id,
  name: state.track_window.current_track.name,
  durationMs: state.track_window.current_track.duration_ms
})

export const getCurrentAlbum = state => ({
  id: state.track_window.current_track.album.uri,
  name: state.track_window.current_track.album.name,
  cover: state.track_window.current_track.album.images[0].url
})

export const getCurrentArtists = state =>
  state.track_window.current_track.artists.map(x => ({
    id: x.uri,
    name: x.name
  }))
