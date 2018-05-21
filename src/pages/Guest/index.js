import { withSocket } from 'components/SocketContext'
import { withGuest } from 'components/GuestContext'
import Guest from './Guest'

export default withSocket(withGuest(Guest))
