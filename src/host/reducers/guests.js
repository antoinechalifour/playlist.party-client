import * as actions from '../actions/guests'

/**
 * Updates a user in the store if its ID matches the guestId parameter.
 * @param {string} guestId - The guest id.
 * @param {() => object} getUpdates - A function to get the updates to apply.
 */
const applyGuestUpdate = (guestId, getUpdates) => guest => {
  if (guest.id === guestId) {
    return {
      ...guest,
      ...getUpdates()
    }
  }

  return guest
}

export default function guestsReducer (state = [], action) {
  switch (action.type) {
    case actions.ADD_GUEST:
      const guest = state.find(x => x.id === action.id) || { id: action.id }
      return [
        ...state.filter(x => x.id !== action.id),
        {
          ...guest,
          name: action.name,
          connection: action.connection,
          dataChannel: action.dataChannel,
          isConnected: false
        }
      ]

    case actions.GUEST_READY:
      return state.map(
        applyGuestUpdate(action.id, () => ({ isConnected: true }))
      )

    case actions.GUEST_DISCONNECTED:
      return state.map(
        applyGuestUpdate(action.id, () => ({ isConnected: false }))
      )

    case '@guest/guest/rename':
      return state.map(
        applyGuestUpdate(action.guestId, () => ({
          name: action.payload.username
        }))
      )

    default:
      return state
  }
}

/**
 * Finds a guest using its id.
 * @param {[{ id: String }]} state - The guest state.
 * @param {String} id - The guest id
 */
export const getGuest = (state, id) => state.find(x => x.id === id) || null

/**
 * Returns all guests.
 * @param {[{ id: String, name: String, connection: RTCPeerConnection, dataChannel: RTCDataChannel }]} state - The guest state.
 */
export const getGuests = state => state

/**
 * Returns all open data channels
 * @param {[{ id: String, name: String, connection: RTCPeerConnection, dataChannel: RTCDataChannel }]} state - The guest state.
 */
export const getAllChannels = state =>
  state.filter(x => x.isConnected).map(x => x.dataChannel)
