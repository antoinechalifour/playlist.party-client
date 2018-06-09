import reducer from './guests'
import * as actions from '../actions/guests'

it('Should return the initial state', () => {
  const state = undefined
  const action = { type: '@@init' }

  expect(reducer(state, action)).toEqual([])
})

it(`Should handle "${actions.ADD_GUEST}" actions`, () => {
  const state = [
    {
      id: 'user-1',
      name: 'John Doe',
      connection: { state: 'open' },
      dataChannel: { foo: 'bar' }
    }
  ]
  const action = actions.addGuest(
    'user-2',
    'Jane doe',
    { state: 'open' },
    { fizz: 'buzz' }
  )

  expect(reducer(state, action)).toEqual([
    {
      id: 'user-1',
      name: 'John Doe',
      connection: { state: 'open' },
      dataChannel: { foo: 'bar' }
    },
    {
      id: 'user-2',
      name: 'Jane doe',
      connection: { state: 'open' },
      dataChannel: { fizz: 'buzz' }
    }
  ])
})

it(`Should handle "${actions.REMOVE_GUEST}" actions`, () => {
  const state = [
    {
      id: 'user-1',
      name: 'John Doe',
      connection: { state: 'open' },
      dataChannel: { foo: 'bar' }
    },
    {
      id: 'user-2',
      name: 'Jane doe',
      connection: { state: 'open' },
      dataChannel: { fizz: 'buzz' }
    }
  ]
  const action = actions.removeGuest('user-1')

  expect(reducer(state, action)).toEqual([
    {
      id: 'user-2',
      name: 'Jane doe',
      connection: { state: 'open' },
      dataChannel: { fizz: 'buzz' }
    }
  ])
})
