export const ADD_GUEST = 'ADD_GUEST'
export const GUEST_READY = 'GUEST_READY'
export const REMOVE_GUEST = 'REMOVE_GUEST'

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

export const removeGuest = id => ({
  type: REMOVE_GUEST,
  id
})
