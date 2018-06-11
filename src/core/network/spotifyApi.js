import axios from 'axios'
import qs from 'querystring'

export default function SpotifyApiFactory ({ accessToken }) {
  const _baseUrl = 'https://api.spotify.com/v1'
  const makeUrl = path => `${_baseUrl}${path}`
  const makeHeaders = (headers = {}) => ({
    ...headers,
    Authorization: `Bearer ${accessToken}`
  })

  return {
    async search (q) {
      const querystring = qs.stringify({
        type: 'track',
        q
      })
      const { data } = await axios.get(makeUrl(`/search?${querystring}`), {
        headers: makeHeaders()
      })

      return data.tracks.items
    },
    tracks: {
      async findOne (id) {
        const { data } = await axios.get(makeUrl(`/tracks/${id}`), {
          headers: makeHeaders()
        })

        return data
      }
    },
    player: {
      async transferPlayback (deviceId) {
        await axios.put(
          makeUrl(`/me/player`),
          {
            device_ids: [deviceId]
          },
          {
            headers: makeHeaders()
          }
        )
      },
      async play (trackUri, deviceId) {
        const options = {}

        if (deviceId) {
          options.device_id = deviceId
        }

        await axios.put(
          makeUrl(`/me/player/play?${qs.stringify(options)}`),
          {
            uris: [trackUri]
          },
          {
            headers: makeHeaders()
          }
        )
      }
    }
  }
}
