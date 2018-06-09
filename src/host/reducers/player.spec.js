import reducer from './player'
import * as actions from '../actions/player'

it('Should return the inital state', () => {
  const state = undefined
  const action = { type: '@@init' }

  expect(reducer(state, action)).toEqual(null)
})

it(`Should handle "${actions.UPDATE_PLAYER_STATE} (not null)"`, () => {
  const state = { foo: 'bar' }
  const action = actions.updatePlayerState({ fizz: 'buzz' })

  expect(reducer(state, action)).toEqual({ fizz: 'buzz' })
})

it(`Should handle "${actions.UPDATE_PLAYER_STATE} (null)"`, () => {
  const state = { foo: 'bar' }
  const action = actions.updatePlayerState(null)

  expect(reducer(state, action)).toEqual(null)
})
