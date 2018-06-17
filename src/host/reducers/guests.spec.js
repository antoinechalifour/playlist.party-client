import reducer, { getGuest, getGuests, getAllChannels } from './guests'
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

describe('getGuest', () => {
  it('Should find the guest in the state', () => {
    const state = [
      {
        id: '12'
      },
      {
        id: '34'
      }
    ]

    expect(getGuest(state, '34')).toBe(state[1])
  })

  it('Should return null when the guest is not found', () => {
    const state = [
      {
        id: '12'
      }
    ]

    expect(getGuest(state, '34')).toBe(null)
  })
})

describe('getGuests', () => {
  it('Should return the state', () => {
    const state = [{ id: '12' }, { id: '34' }]
    expect(getGuests(state)).toBe(state)
  })
})

describe('getAllChannels', () => {
  it('Should return all data channels', () => {
    const state = [
      { id: '12', dataChannel: {} },
      { id: '34', dataChannel: {} },
      { id: '56', dataChannel: {} }
    ]

    expect(getAllChannels(state)).toEqual([
      state[0].dataChannel,
      state[1].dataChannel,
      state[2].dataChannel
    ])
  })
})
