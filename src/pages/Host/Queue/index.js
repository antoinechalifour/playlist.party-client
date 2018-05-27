import { connectToHost } from 'components/HostContext'
import Queue from './Queue'

export default connectToHost(Queue, (state, actions) => ({
  // TODO: Compute battle
  // TODO: Compute queue
  battle: state.queue.filter(x => x.role === 'battle'),
  queue: state.queue.filter(x => x.role === 'queue')
}))
