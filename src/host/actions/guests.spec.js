import * as actions from './guests'

describe('addGuest', () => {
  it('Should return the action', () => {
    expect(
      actions.addGuest('user', 'anonymous', { foo: 'bar' }, { fizz: 'buzz' })
    ).toEqual({
      type: 'ADD_GUEST',
      id: 'user',
      name: 'anonymous',
      connection: { foo: 'bar' },
      dataChannel: { fizz: 'buzz' }
    })
  })
})

describe('guestReady', () => {
  it('Should return the action', () => {
    expect(actions.guestReady('user')).toEqual({
      type: 'GUEST_READY',
      id: 'user'
    })
  })
})

describe('removeGuest', () => {
  it('Should return the action', () => {
    expect(actions.removeGuest('user')).toEqual({
      type: 'REMOVE_GUEST',
      id: 'user'
    })
  })
})
