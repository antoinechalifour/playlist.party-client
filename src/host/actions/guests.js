export const ADD_GUEST = 'ADD_GUEST'
export const REMOVE_GUEST = 'REMOVE_GUEST'

export const addGuest = (id, name, connection, dataChannel) => ({
  type: ADD_GUEST,
  id,
  name,
  connection,
  dataChannel
})

export const removeGuest = id => ({
  type: REMOVE_GUEST,
  id
})
