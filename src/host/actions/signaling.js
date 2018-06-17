export const SIGNALING_CONNECTED = 'SIGNALING_CONNECTED'
export const SIGNALING_DISCONNECTED = 'SIGNALING_DISCONNECTED'
export const SIGNALING_IN_JOIN = 'SIGNALING_IN_JOIN'
export const SIGNALING_IN_LEAVE = 'SIGNALING_IN_LEAVE'
export const SIGNALING_IN_ANSWER = 'SIGNALING_IN_ANSWER'
export const SIGNALING_IN_CANDIDATE = 'SIGNALING_IN_CANDIDATE'

export const signalingConnected = () => ({
  type: SIGNALING_CONNECTED
})

export const signalingDisconnected = () => ({
  type: SIGNALING_DISCONNECTED
})

export const signalingInJoin = remoteId => ({
  type: SIGNALING_IN_JOIN,
  remoteId
})

export const signalingInLeave = remoteId => ({
  type: SIGNALING_IN_LEAVE,
  remoteId
})

export const signalingInAnswer = (remoteId, description) => ({
  type: SIGNALING_IN_ANSWER,
  remoteId,
  description
})

export const signalingInCandidate = (remoteId, candidate) => ({
  type: SIGNALING_IN_CANDIDATE,
  remoteId,
  candidate
})
