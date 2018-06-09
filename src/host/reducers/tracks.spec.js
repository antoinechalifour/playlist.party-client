import reducer from './tracks'
import * as actions from '../actions/tracks'

it('Should return the initial state', () => {
  const state = undefined
  const action = { type: '@@init' }

  expect(reducer(state, action)).toEqual({
    previous: [],
    current: null,
    next: [],
    queue: []
  })
})

it(`Should handle ${actions.ADD_TO_QUEUE}`, () => {
  const state = {
    previous: [{ id: '12' }],
    current: null,
    next: [{ id: '34' }, { id: '56' }],
    queue: [{ id: '78' }]
  }
  const action = actions.addToQueue({ id: '90' })

  expect(reducer(state, action)).toEqual({
    previous: [{ id: '12' }],
    current: null,
    next: [{ id: '34' }, { id: '56' }],
    queue: [{ id: '78' }, { id: '90' }]
  })
})

it(`Should handle ${actions.ADD_TO_BATTLE}`, () => {
  const state = {
    previous: [{ id: '12' }],
    current: null,
    next: [{ id: '34' }],
    queue: [{ id: '56' }, { id: '78' }]
  }
  const action = actions.addToBattle({ id: '56' })

  expect(reducer(state, action)).toEqual({
    previous: [{ id: '12' }],
    current: null,
    next: [{ id: '34' }, { id: '56' }],
    queue: [{ id: '78' }]
  })
})
