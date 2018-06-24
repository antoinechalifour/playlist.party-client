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
    expect(actions.addToPrevious([{ id: 12 }, { id: 34 }], 34)).toEqual({
      type: 'ADD_TO_PREVIOUS',
      tracks: [
        {
          id: 12,
          role: 'loser'
        },
        {
          id: 34,
          role: 'winner'
        }
      ]
    })

    expect(actions.addToPrevious([{ id: 12 }], 12)).toEqual({
      type: 'ADD_TO_PREVIOUS',
      tracks: [
        {
          id: 12,
          role: 'winner'
        }
      ]
    })
  })
})

describe('processVote', () => {
  it('Should return the action', () => {
    expect(actions.startProcessVote()).toEqual({
      type: 'START_PROCESS_VOTE'
    })
  })
})
