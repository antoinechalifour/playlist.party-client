import * as actions from './tracks'

describe('addToBattle', () => {
  it('Should return the action', () => {
    expect(actions.addToBattle({ foo: 'bar' })).toEqual({
      type: 'ADD_TO_BATTLE',
      track: { foo: 'bar' }
    })
  })
})

describe('addToQueue', () => {
  it('Should return the action', () => {
    expect(actions.addToQueue({ foo: 'bar' })).toEqual({
      type: 'ADD_TO_QUEUE',
      track: { foo: 'bar' }
    })
  })
})

describe('addToPrevious', () => {
  it('Should return the action', () => {
    expect(actions.addToPrevious({ foo: 'bar' })).toEqual({
      type: 'ADD_TO_PREVIOUS',
      track: { foo: 'bar' }
    })
  })
})

describe('triggerVote', () => {
  it('Should return the action', () => {
    expect(actions.triggerVote()).toEqual({
      type: 'TRIGGER_VOTE'
    })
  })
})