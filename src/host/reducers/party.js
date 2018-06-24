import * as actions from '../actions/party'

export const STATUS_CREATION_ERROR = 'STATUS_CREATION_ERROR'
export const STATUS_WAITING_FOR_TRACKS = 'STATUS_WAITING_FOR_TRACKS'
export const STATUS_WAITING_TO_START = 'STATUS_WAITING_TO_START'
export const STATUS_STARTED = 'STATUS_STARTED'
export const STATUS_FINISHED = 'STATUS_FINISHED'

export default function partyReducer (state = null, action) {
  switch (action.type) {
    case actions.PARTY_STATUS_CREATION_ERROR:
      return {
        ...state,
        status: STATUS_CREATION_ERROR
      }

    case actions.PARTY_STATUS_WAITING_FOR_TRACKS:
      return {
        ...state,
        status: STATUS_WAITING_FOR_TRACKS
      }

    case actions.PARTY_STATUS_WAITING_TO_START:
      return {
        ...state,
        status: STATUS_WAITING_TO_START
      }

    case actions.PARTY_STATUS_STARTED:
      return {
        ...state,
        status: STATUS_STARTED
      }

    case actions.PARTY_STATUS_FINISHED:
      return {
        ...state,
        status: STATUS_FINISHED
      }

    default:
      return state
  }
}

export const getAccessToken = state => state.accessToken

export const getParty = state => ({
  name: state.name,
  code: state.code
})

export const getPartyStatus = state => state.status

export const isPartyReady = state =>
  getPartyStatus(state) === STATUS_WAITING_TO_START

export const isPartyLocked = state =>
  getPartyStatus(state) === STATUS_CREATION_ERROR

export const isPartyOver = state => getPartyStatus(state) === STATUS_FINISHED
