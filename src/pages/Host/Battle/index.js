import { connectToHost } from '../../../components/HostContext'
import Battle from './Battle'

export default connectToHost(Battle, state => ({
  battle: state.queue.filter(x => x.role === 'battle')
}))
