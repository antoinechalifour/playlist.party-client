import { connectToHost } from 'components/HostContext'
import Guests from './Guests'

export default connectToHost(Guests, state => ({
  guests: state.guests
}))
