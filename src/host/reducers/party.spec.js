import reducer from './party'

it('Should return the initial state', () => {
  const state = undefined
  const action = { type: '@@init' }

  expect(reducer(state, action)).toEqual(null)
})
