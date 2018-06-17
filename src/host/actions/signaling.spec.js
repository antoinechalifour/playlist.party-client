import * as actions from './signaling'

describe('signalingConnected', () => {
  it('Should return the action', () => {
    expect(actions.signalingConnected()).toEqual({
      type: 'SIGNALING_CONNECTED'
    })
  })
})

describe('signalingDisconnected', () => {
  it('Should return the action', () => {
    expect(actions.signalingDisconnected()).toEqual({
      type: 'SIGNALING_DISCONNECTED'
    })
  })
})

describe('signalingInJoin', () => {
  it('Should return the action', () => {
    expect(actions.signalingInJoin('userId')).toEqual({
      type: 'SIGNALING_IN_JOIN',
      remoteId: 'userId'
    })
  })
})

describe('signalingInLeave', () => {
  it('Should return the action', () => {
    expect(actions.signalingInLeave('userId')).toEqual({
      type: 'SIGNALING_IN_LEAVE',
      remoteId: 'userId'
    })
  })
})

describe('signalingInAnswer', () => {
  it('Should return the action', () => {
    expect(actions.signalingInAnswer('userId', 'description')).toEqual({
      type: 'SIGNALING_IN_ANSWER',
      remoteId: 'userId',
      description: 'description'
    })
  })
})

describe('signalingInCandidate', () => {
  it('Should return the action', () => {
    expect(actions.signalingInCandidate('userId', 'candidate')).toEqual({
      type: 'SIGNALING_IN_CANDIDATE',
      remoteId: 'userId',
      candidate: 'candidate'
    })
  })
})
