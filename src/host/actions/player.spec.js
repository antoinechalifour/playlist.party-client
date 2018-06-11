import * as actions from './player'

describe('updatePlayerState', () => {
  it('Should return the action', () => {
    expect(actions.updatePlayerState({ foo: 'bar' })).toEqual({
      type: 'UPDATE_PLAYER_STATE',
      state: { foo: 'bar' }
    })
  })
})

describe('playTrack', () => {
  it('Should return the action', () => {
    expect(actions.playTrack({ foo: 'bar' })).toEqual({
      type: 'PLAY_TRACK',
      track: { foo: 'bar' }
    })
  })
})
