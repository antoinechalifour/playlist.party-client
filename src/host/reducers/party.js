import * as actions from '../actions/party'

export default function partyReducer (state = null, action) {
  switch (action.type) {
    case actions.PARTY_READY:
      return { ...state, isStarted: true }

    default:
      return state
  }
}

export const getAccessToken = state => state.accessToken

export const getParty = state => ({
  name: state.name,
  code: state.code,
  isStarted: state.isStarted
})
