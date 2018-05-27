import { connectToHost } from 'components/HostContext'
import Player from './Player'

export default connectToHost(Player, (state, actions) => ({
  player: state.player,
  spotify: state.spotify,
  processVote: actions.processVote
}))
