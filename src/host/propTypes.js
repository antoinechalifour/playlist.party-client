import PropTypes from 'prop-types'

export const GuestPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isConnected: PropTypes.bool.isRequired,
  connection: PropTypes.object.isRequired,
  dataChannel: PropTypes.object.isRequired
})
