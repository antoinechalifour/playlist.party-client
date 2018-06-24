export const ADD_GUEST = 'ADD_GUEST'
export const GUEST_READY = 'GUEST_READY'
export const GUEST_DISCONNECTED = 'GUEST_DISCONNECTED'

export const addGuest = (id, name, connection, dataChannel) => ({
  type: ADD_GUEST,
  id,
  name,
  connection,
  dataChannel
})

export const guestReady = id => ({
  type: GUEST_READY,
  id
})

export const guestDisconnected = id => ({
  type: GUEST_DISCONNECTED,
  id
})
