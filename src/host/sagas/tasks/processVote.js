import { call, put, select } from 'redux-saga/effects'
import { getNextContenders, getContenders } from 'host/reducers'
import { playTrack } from 'host/actions/player'
import { addToPrevious, addToBattle } from 'host/actions/tracks'
import notifyBattleUpdate from 'host/sagas/tasks/notifyBattleUpdate'

/**
 * Describes the vote process: decides which track is going to be played
 * next based on the number of votes.
 *
 * When only 1 track is in the contenders list, it gets played without
 * a vote.
 * When 2 tracks are contending, the most voted one gets played. In case
 * of equality, track 1 is played if the number of votes is event (track 2
 * is played otherwise)
 */
export default function * processVote () {
  const contenders = yield select(getContenders)

  if (contenders.length === 1) {
    const winner = contenders[0]
    yield put(playTrack(winner))
    yield put(addToPrevious(contenders, winner.id))

    const nextContenders = yield select(getNextContenders)

    for (const contender of nextContenders) {
      yield put(addToBattle(contender))
    }
  } else if (contenders.length === 2) {
    const [contender1, contender2] = contenders
    let winner

    if (contender1.votes.length === contender2.votes.length) {
      // Winner is selected based on the number of votes
      // even : 1 / odd : 2
      winner = contender1.votes.length % 2 === 0 ? contender2 : contender1
    } else {
      // Select the one with max votes
      winner = contender1.votes.length > contender2.votes.length
        ? contender1
        : contender2
    }

    yield put(playTrack(winner))

    yield put(addToPrevious(contenders, winner.id))

    const nextContenders = yield select(getNextContenders)

    for (const contender of nextContenders) {
      yield put(addToBattle(contender))
    }

    yield call(notifyBattleUpdate)
  }
}
