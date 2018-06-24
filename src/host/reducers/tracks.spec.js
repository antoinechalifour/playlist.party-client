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
    previous: [[{ id: '12', role: 'winner' }]],
    next: [{ id: '34' }, { id: '98' }],
    queue: [{ id: '56' }, { id: '78' }]
  }
  const action = actions.addToPrevious([{ id: '34' }, { id: '98' }], '34')

  expect(reducer(state, action)).toEqual({
    previous: [
      [{ id: '12', role: 'winner' }],
      [{ id: '34', role: 'winner' }, { id: '98', role: 'loser' }]
    ],
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

it('Should not allow one user to votes multiple times for the same track', () => {
  const action = {
    type: '@guest/battle/vote',
    payload: {
      trackId: '56'
    },
    guestId: 'user1'
  }

  const state = {
    previous: [{ id: '12' }],
    next: [{ id: '34', votes: ['user1'] }, { id: '56', votes: ['user1'] }],
    queue: [{ id: '78' }]
  }

  expect(reducer(state, action)).toEqual({
    previous: [{ id: '12' }],
    next: [{ id: '34', votes: [] }, { id: '56', votes: ['user1'] }],
    queue: [{ id: '78' }]
  })
})

describe('isBattleFull', () => {
  it('Should return true when the next contenders length is 2', () => {
    const state = {
      next: [{ id: '12' }, { id: '34' }]
    }

    expect(selectors.isBattleFull(state)).toBe(true)
  })

  it('Should return false when the next contenders length is not 2', () => {
    const state = {
      next: [{ id: '12' }]
    }

    expect(selectors.isBattleFull(state)).toBe(false)
  })
})

describe('getContenders', () => {
  it('Should return the next tracks', () => {
    const state = {
      next: [{ id: '12' }]
    }

    expect(selectors.getContenders(state)).toBe(state.next)
  })
})

describe('getNextContenders', () => {
  it('Should return the next contenders (1)', () => {
    const state = {
      queue: [{ id: '12' }]
    }

    expect(selectors.getNextContenders(state)).toEqual([state.queue[0]])
  })

  it('Should return the next contenders (3)', () => {
    const state = {
      queue: [{ id: '12' }, { id: '34' }, { id: '56' }]
    }

    expect(selectors.getNextContenders(state)).toEqual([
      state.queue[0],
      state.queue[1]
    ])
  })
})

describe('getQueue', () => {
  it('Should return the queue', () => {
    const state = {
      queue: [{ id: '12' }, { id: '34' }, { id: '56' }]
    }

    expect(selectors.getQueue(state)).toEqual(state.queue)
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

describe('getTracksSummary', () => {
  const state = require('./mocks/partyFinished').default
  const expected = require('./mocks/expectedTracksSummary').default

  it('Returns the track summary', () => {
    expect(selectors.getTracksSummary(state.tracks)).toEqual(expected)
  })
})
