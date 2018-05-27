import { connectToHost } from 'components/HostContext'
import Host from './Host'

export default connectToHost(Host, (state, actions) => ({
  accessToken: state.accessToken,
  setPlayer: actions.setPlayer
}))
