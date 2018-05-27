import { withSocket } from 'components/SocketContext'
import { connectToHost } from 'components/HostContext'
import Party from './Party'

export default withSocket(
  connectToHost(Party, (state, actions) => ({
    party: state.party,
    addGuest: actions.addGuest
  }))
)
