import { withSocket } from 'components/SocketContext'
import { withHostContext } from 'components/HostContext'
import Party from './Party'

export default withSocket(withHostContext(Party))
