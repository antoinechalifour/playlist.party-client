import PropTypes from 'prop-types'
import styled from 'styled-components'

const TrackCover = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  background-image: url(${({ cover }) => cover});
  background-size: cover;
  background-position: center ${({ align }) => align};
  width: ${({ votes, totalVotes }) => {
    if (totalVotes === 0) {
      return '50%'
    }

    return `${votes / totalVotes * 100}%`
  }};
  transition: width .2s ease;

  ${({ align }) => align}: 0;
`

TrackCover.propTypes = {
  cover: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  totalVotes: PropTypes.number.isRequired,
  align: PropTypes.oneOf(['left', 'right']).isRequired
}

export default TrackCover
