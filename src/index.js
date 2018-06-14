import 'reset.css/reset.css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import Socket from 'socket.io-client'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const socket = Socket(process.env.REACT_APP_SIGNALING_URI)
const props = { socket }

ReactDOM.render(<App {...props} />, document.getElementById('root'))
registerServiceWorker()
