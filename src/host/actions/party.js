export const PARTY_STATUS_CREATING = 'PARTY_STATUS_CREATING'
export const PARTY_STATUS_CREATION_ERROR = 'PARTY_STATUS_CREATION_ERROR'
export const PARTY_STATUS_WAITING_FOR_TRACKS = 'PARTY_STATUS_WAITING_FOR_TRACKS'
export const PARTY_STATUS_WAITING_TO_START = 'PARTY_STATUS_WAITING_TO_START'
export const PARTY_STATUS_STARTED = 'PARTY_STATUS_STARTED'
export const PARTY_STATUS_FINISHED = 'PARTY_STATUS_FINISHED'
export const START_PARTY = 'START_PARTY'
export const PARTY_TOKEN_EXPIRED = 'PARTY_TOKEN_EXPIRED'

export const partyStatusCreating = () => ({
  type: PARTY_STATUS_CREATING
})

export const partyStatusCreationError = () => ({
  type: PARTY_STATUS_CREATION_ERROR
})

export const partyStatusWaitingForTracks = () => ({
  type: PARTY_STATUS_WAITING_FOR_TRACKS
})

export const partyStatusWaitingToStart = () => ({
  type: PARTY_STATUS_WAITING_TO_START
})

export const partyStatusStarted = () => ({
  type: PARTY_STATUS_STARTED
})

export const partyStatusFinished = () => ({
  type: PARTY_STATUS_FINISHED
})

export const startParty = () => ({
  type: START_PARTY
})

export const partyTokenExpired = () => ({
  type: PARTY_TOKEN_EXPIRED
})
