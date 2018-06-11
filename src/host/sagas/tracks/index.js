import { put, select, takeEvery } from 'redux-saga/effects'
import { TRIGGER_VOTE, addToPrevious, addToBattle } from 'host/actions/tracks'
import { getContenders, getNextContenders } from 'host/reducers'
import { playTrack } from 'host/actions/player'

export function * processVote () {
  const contenders = yield select(getContenders)

  if (contenders.length === 1) {
    const winner = contenders[0]
    yield put(playTrack(winner))
    yield put(addToPrevious(winner))

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

    for (const contender of contenders) {
      yield put(addToPrevious(contender))
    }

    const nextContenders = yield select(getNextContenders)

    for (const contender of nextContenders) {
      yield put(addToBattle(contender))
    }
  }
}

export default function * root () {
  yield takeEvery(TRIGGER_VOTE, processVote)
}
