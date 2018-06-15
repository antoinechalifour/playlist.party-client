import reducer, * as selectors from './tracks'
import * as actions from '../actions/tracks'

it('Should return the initial state', () => {
  const state = undefined
  const action = { type: '@@init' }

  expect(reducer(state, action)).toEqual({
    previous: [],
    next: [],
    queue: []
  })
})

it(`Should handle ${actions.ADD_TO_QUEUE}`, () => {
  const state = {
    previous: [{ id: '12' }],
    next: [{ id: '34', votes: ['user1'] }, { id: '56', votes: [] }],
    queue: [{ id: '78' }]
  }
  const action = actions.addToQueue({ id: '90' })

  expect(reducer(state, action)).toEqual({
    previous: [{ id: '12' }],
    next: [{ id: '34', votes: ['user1'] }, { id: '56', votes: [] }],
    queue: [{ id: '78' }, { id: '90' }]
  })
})

it(`Should handle ${actions.ADD_TO_BATTLE}`, () => {
  const state = {
    previous: [{ id: '12' }],
    next: [{ id: '34', votes: ['user1'] }],
    queue: [{ id: '56' }, { id: '78' }]
  }
  const action = actions.addToBattle({ id: '56' })

  expect(reducer(state, action)).toEqual({
    previous: [{ id: '12' }],
    next: [{ id: '34', votes: ['user1'] }, { id: '56', votes: [] }],
    queue: [{ id: '78' }]
  })
})

it(`Should handle ${actions.ADD_TO_PREVIOUS}`, () => {
  const state = {
    previous: [{ id: '12' }],
    next: [{ id: '34' }],
    queue: [{ id: '56' }, { id: '78' }]
  }
  const action = actions.addToPrevious({ id: '34' })

  expect(reducer(state, action)).toEqual({
    previous: [{ id: '12' }, { id: '34' }],
    next: [],
    queue: [{ id: '56' }, { id: '78' }]
  })
})

it('Should handle "@guest/battle/vote"', () => {
  const action = {
    type: '@guest/battle/vote',
    payload: {
      trackId: '56'
    },
    guestId: 'user1'
  }

  const state = {
    previous: [{ id: '12' }],
    next: [{ id: '34', votes: ['user1'] }, { id: '56', votes: [] }],
    queue: [{ id: '78' }]
  }

  expect(reducer(state, action)).toEqual({
    previous: [{ id: '12' }],
    next: [{ id: '34', votes: [] }, { id: '56', votes: ['user1'] }],
    queue: [{ id: '78' }]
  })
})

describe('getVoteProgress', () => {
  it('Should return 50% (no votes)', () => {
    const state = {
      next: [
        {
          id: '34',
          votes: []
        },
        {
          id: '56',
          votes: []
        }
      ]
    }

    expect(selectors.getVoteProgress('34', state)).toEqual(0.5)
  })

  it('Should return 75%', () => {
    const state = {
      next: [
        {
          id: '34',
          votes: ['a', 'b', 'c']
        },
        {
          id: '56',
          votes: ['d']
        }
      ]
    }

    expect(selectors.getVoteProgress('34', state)).toEqual(0.75)
  })
})
