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
      dataChannel: { foo: 'bar' },
      isConnected: true
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
      dataChannel: { foo: 'bar' },
      isConnected: true
    },
    {
      id: 'user-2',
      name: 'Jane doe',
      connection: { state: 'open' },
      dataChannel: { fizz: 'buzz' },
      isConnected: false
    }
  ])
})

it(`Should handle "${actions.ADD_GUEST}" actions when the user already has an account`, () => {
  const state = [
    {
      id: 'user-1',
      name: 'John Doe',
      connection: { state: 'closed' },
      dataChannel: { foo: 'bar' },
      isConnected: false
    }
  ]
  const action = actions.addGuest(
    'user-1',
    'Jane Doe',
    { state: 'open' },
    { fizz: 'buzz' }
  )

  expect(reducer(state, action)).toEqual([
    {
      id: 'user-1',
      name: 'Jane Doe',
      connection: { state: 'open' },
      dataChannel: { fizz: 'buzz' },
      isConnected: false
    }
  ])
})

it(`Should handle "${actions.GUEST_READY}"`, () => {
  const state = [
    {
      id: 'user-1',
      name: 'John Doe',
      connection: { state: 'open' },
      dataChannel: { foo: 'bar' },
      isConnected: false
    },
    {
      id: 'user-2',
      name: 'Jane doe',
      connection: { state: 'open' },
      dataChannel: { fizz: 'buzz' },
      isConnected: true
    }
  ]
  const action = actions.guestReady('user-1')

  expect(reducer(state, action)).toEqual([
    {
      id: 'user-1',
      name: 'John Doe',
      connection: { state: 'open' },
      dataChannel: { foo: 'bar' },
      isConnected: true
    },
    {
      id: 'user-2',
      name: 'Jane doe',
      connection: { state: 'open' },
      dataChannel: { fizz: 'buzz' },
      isConnected: true
    }
  ])
})

it(`Should handle "${actions.GUEST_DISCONNECTED}" actions`, () => {
  const state = [
    {
      id: 'user-1',
      name: 'John Doe',
      connection: { state: 'open' },
      dataChannel: { foo: 'bar' },
      isConnected: true
    },
    {
      id: 'user-2',
      name: 'Jane doe',
      connection: { state: 'open' },
      dataChannel: { fizz: 'buzz' },
      isConnected: true
    }
  ]
  const action = actions.guestDisconnected('user-1')

  expect(reducer(state, action)).toEqual([
    {
      id: 'user-1',
      name: 'John Doe',
      connection: { state: 'open' },
      dataChannel: { foo: 'bar' },
      isConnected: false
    },
    {
      id: 'user-2',
      name: 'Jane doe',
      connection: { state: 'open' },
      dataChannel: { fizz: 'buzz' },
      isConnected: true
    }
  ])
})

it('Should handler "@guest/guest/rename" actions', () => {
  const state = [
    {
      id: 'user-1',
      name: 'John Doe',
      connection: { state: 'open' },
      dataChannel: { foo: 'bar' },
      isConnected: true
    },
    {
      id: 'user-2',
      name: 'Jane doe',
      connection: { state: 'open' },
      dataChannel: { fizz: 'buzz' },
      isConnected: true
    }
  ]
  const action = {
    type: '@guest/guest/rename',
    guestId: 'user-1',
    payload: {
      username: 'Modified username'
    }
  }

  expect(reducer(state, action)).toEqual([
    {
      id: 'user-1',
      name: 'Modified username',
      connection: { state: 'open' },
      dataChannel: { foo: 'bar' },
      isConnected: true
    },
    {
      id: 'user-2',
      name: 'Jane doe',
      connection: { state: 'open' },
      dataChannel: { fizz: 'buzz' },
      isConnected: true
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
      { id: '12', dataChannel: {}, isConnected: true },
      { id: '34', dataChannel: {}, isConnected: false },
      { id: '56', dataChannel: {}, isConnected: true }
    ]

    expect(getAllChannels(state)).toEqual([
      state[0].dataChannel,
      state[2].dataChannel
    ])
  })
})
