import * as actions from './party'

describe('startParty', () => {
  it('Should return the action', () => {
    expect(actions.startParty()).toEqual({
      type: 'START_PARTY'
    })
  })
})

describe('partyReady', () => {
  it('Should return the action', () => {
    expect(actions.partyReady()).toEqual({
      type: 'PARTY_READY'
    })
  })
})
