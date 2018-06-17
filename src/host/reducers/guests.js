import * as actions from '../actions/guests'

export default function guestsReducer (state = [], action) {
  switch (action.type) {
    case actions.ADD_GUEST:
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          connection: action.connection,
          dataChannel: action.dataChannel
        }
      ]

    case actions.REMOVE_GUEST:
      return state.filter(x => x.id !== action.id)

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
 * Returns all data channels
 * @param {[{ id: String, name: String, connection: RTCPeerConnection, dataChannel: RTCDataChannel }]} state - The guest state.
 */
export const getAllChannels = state => state.map(x => x.dataChannel)
