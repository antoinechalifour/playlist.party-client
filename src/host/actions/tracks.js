export const ADD_TO_BATTLE = 'ADD_TO_BATTLE'
export const ADD_TO_QUEUE = 'ADD_TO_QUEUE'

export const addToBattle = track => ({
  type: ADD_TO_BATTLE,
  track
})

export const addToQueue = track => ({
  type: ADD_TO_QUEUE,
  track
})
