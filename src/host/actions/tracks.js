export const ADD_TO_BATTLE = 'ADD_TO_BATTLE'
export const ADD_TO_QUEUE = 'ADD_TO_QUEUE'
export const ADD_TO_PREVIOUS = 'ADD_TO_PREVIOUS'
export const TRIGGER_VOTE = 'TRIGGER_VOTE'

export const addToBattle = track => ({
  type: ADD_TO_BATTLE,
  track
})

export const addToQueue = track => ({
  type: ADD_TO_QUEUE,
  track
})

export const addToPrevious = track => ({
  type: ADD_TO_PREVIOUS,
  track
})

export const triggerVote = () => ({
  type: TRIGGER_VOTE
})
