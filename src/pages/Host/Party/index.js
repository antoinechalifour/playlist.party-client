import { withSocket } from 'components/SocketContext'
import { withHost } from 'components/HostContext'
import Party from './Party'

export default withSocket(withHost(Party))
