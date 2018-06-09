import * as actions from '../actions/player'

export default function playerReducer (state = null, action) {
  switch (action.type) {
    case actions.UPDATE_PLAYER_STATE:
      return action.state

    default:
      return state
  }
}
