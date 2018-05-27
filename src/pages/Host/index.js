import { connectToHost } from 'components/HostContext'
import Host from './Host'

export default connectToHost(Host, state => ({
  accessToken: state.accessToken
}))
