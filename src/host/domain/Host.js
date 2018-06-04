import { v4 as uuid } from 'uuid'
import Store from 'core/domain/Store'
import createPeerSocket from 'core/network/createPeerSocket'

export default class Host extends Store {
  constructor ({ party, code, accessToken, spotify }) {
    super()
    this.party = party
    this.code = code
    this.accessToken = accessToken
    this.spotify = spotify
    this.guests = []
    // this.queue = []
    this.queue = require('./mockQueue').default
    this.player = null
  }

  get state () {
    return {
      party: {
        name: this.party,
        code: this.code
      },
      accessToken: this.accessToken,
      spotify: this.spotify,
      guests: this.guests,
      queue: this.queue,
      player: this.player
    }
  }

  get actions () {
    return {
      addGuest: this.addGuest,
      removeGuest: this.removeGuest,
      setPlayer: this.setPlayer,
      processVote: this.processVote
    }
  }

  setPlayer = player => {
    this.player = player
    this.notify(this.state)
  }

  _onGuestSearch = guestId => async ({ q }, ack) => {
    const tracks = await this.spotify.search(q)

    console.log(tracks)

    ack({ results: tracks })
  }

  _onQueueAdd = guestId => async ({ trackId }) => {
    // TODO: Add to the queue
    console.log('QueueAdd:', trackId)
    const track = await this.spotify.tracks.findOne(trackId)
    const role = this.queue.length < 2 ? 'battle' : 'queue'

    this.queue.push({
      track,
      role,
      votes: []
    })

    this.notify(this.state)
  }

  _onBattleVote = guestId => ({ trackId }) => {
    // TODO: Do something with the vote
    const battle = this.queue.filter(x => x.role === 'battle')

    battle.forEach(track => {
      track.votes = track.votes.filter(x => x !== guestId)
      if (track.track.id === trackId) {
        track.votes.push(guestId)
      }
    })

    this.notify(this.state)
  }

  _onGuestRename = guestId => ({ name }) => {
    this.guests.forEach(guest => {
      if (guest.id === guestId) {
        guest.name = name
      }
    })

    this.notify(this.state)
  }

  addGuest = (connection, dataChannel) => {
    const socket = createPeerSocket(dataChannel)
    const guestId = uuid()
    dataChannel.onclose = () => {
      this.removeGuest(connection)
    }

    socket.on('search', this._onGuestSearch(guestId))
    socket.on('queue/add', this._onQueueAdd(guestId))
    socket.on('battle/vote', this._onBattleVote(guestId))
    socket.on('guest/rename', this._onGuestRename(guestId))

    this.guests.push({
      id: guestId,
      name: null,
      connection,
      dataChannel,
      socket
    })

    // TODO: Send the current battle to the new client
    this.notifyGuest(guestId)

    this.notify(this.state)
  }

  removeGuest = connection => {
    this.guests = this.guests.filter(guest => guest.connection !== connection)

    this.notify(this.state)
  }

  notifyGuests () {
    this.guests.forEach(x => this.notifyGuest(x.id))
  }

  notifyGuest (guestId) {
    const guest = this.guests.find(x => x.id === guestId)
    const tracks = this.queue.filter(x => x.role === 'battle').map(x => x.track)

    guest.socket.emit('battle/update', { tracks })
  }

  processVote = () => {
    const battlingTracks = this.queue.filter(x => x.role === 'battle')
    const nextTrack = battlingTracks.reduce((tmpWin, track) => {
      if (!tmpWin) {
        return track
      }

      return track.votes.length > tmpWin.votes.length ? track : tmpWin
    }, null)

    this.queue = this.queue.filter(x => x.role !== 'battle')

    this.spotify.player.play(nextTrack.track.uri)

    if (this.queue[0]) {
      this.queue[0].role = 'battle'
    }

    if (this.queue[1]) {
      this.queue[1].role = 'battle'
    }

    this.notify(this.state)
    this.notifyGuests()
  }
}
