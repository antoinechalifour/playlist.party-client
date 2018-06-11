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

export const getGuest = (state, id) => state.find(x => x.id === id)

export const getGuests = state => state

export const getAllChannels = state => state.map(x => x.dataChannel)
