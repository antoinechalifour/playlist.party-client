export const UPDATE_PLAYER_STATE = 'UPDATE_PLAYER_STATE'
export const PLAY_TRACK = 'PLAY_TRACK'

export const updatePlayerState = state => ({
  type: UPDATE_PLAYER_STATE,
  state
})

export const playTrack = track => ({
  type: PLAY_TRACK,
  track
})
