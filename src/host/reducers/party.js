export default function partyReducer (state = null, action) {
  return state
}

export const getAccessToken = state => state.accessToken

export const getParty = state => ({
  name: state.name,
  code: state.code
})
