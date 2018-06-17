import { cloneableGenerator } from 'redux-saga/utils'
import { select, put, call } from 'redux-saga/effects'
import { getContenders, getNextContenders } from 'host/reducers'
import { playTrack } from 'host/actions/player'
import { addToPrevious, addToBattle } from 'host/actions/tracks'
import notifyBattleUpdate from 'host/sagas/tasks/notifyBattleUpdate'
import processVote from './processVote'

describe('processVote saga', () => {
  const gen = cloneableGenerator(processVote)()
  expect(gen.next().value).toEqual(select(getContenders))

  describe('no contenders', () => {
    const clone = gen.clone()

    it('Should do nothing', () => {
      expect(clone.next([]).done).toBe(true)
    })
  })

  describe('1 contender', () => {
    const clone = gen.clone()
    const contenders = [
      {
        id: '134',
        name: 'Never gonna give you up'
      }
    ]
    const nextContenders = [
      {
        id: '1',
        name: 'Fade to black'
      },
      {
        id: '2',
        name: 'Back to black'
      }
    ]

    it('Should return a play action for the contender', () => {
      expect(clone.next(contenders).value).toEqual(
        put(playTrack(contenders[0]))
      )
    })

    it('Should put the contender in the previous list', () => {
      expect(clone.next().value).toEqual(put(addToPrevious(contenders[0])))
    })

    it('Should add the next 2 tracks in the queue as contenders', () => {
      expect(clone.next().value).toEqual(select(getNextContenders))
      expect(clone.next(nextContenders).value).toEqual(
        put(addToBattle(nextContenders[0]))
      )
      expect(clone.next().value).toEqual(put(addToBattle(nextContenders[1])))
    })
  })

  describe('multiple contenders (as a winner)', () => {
    const clone = gen.clone()
    const contenders = [
      {
        id: '134',
        name: 'Never gonna give you up',
        votes: ['a']
      },
      {
        id: '456',
        name: 'O fortuna',
        votes: ['b', 'c'] // Winner
      }
    ]
    const nextContenders = [
      {
        id: '1',
        name: 'Fade to black'
      },
      {
        id: '2',
        name: 'Back to black'
      }
    ]

    it('Should return a play action for the winner', () => {
      expect(clone.next(contenders).value).toEqual(
        put(playTrack(contenders[1]))
      )
    })

    it('Should put the contenders in the previous list', () => {
      expect(clone.next().value).toEqual(put(addToPrevious(contenders[0])))
      expect(clone.next().value).toEqual(put(addToPrevious(contenders[1])))
    })

    it('Should add the next 2 tracks in the queue as contenders', () => {
      expect(clone.next().value).toEqual(select(getNextContenders))
      expect(clone.next(nextContenders).value).toEqual(
        put(addToBattle(nextContenders[0]))
      )
      expect(clone.next().value).toEqual(put(addToBattle(nextContenders[1])))
    })

    it('Should notify the guests that the battle changed', () => {
      expect(clone.next().value).toEqual(call(notifyBattleUpdate))
    })
  })

  describe('multiple contenders (equality / choose contender 1)', () => {
    const clone = gen.clone()
    const contenders = [
      {
        id: '134',
        name: 'Never gonna give you up',
        votes: ['a'] // Winner
      },
      {
        id: '456',
        name: 'O fortuna',
        votes: ['b']
      }
    ]
    const nextContenders = [
      {
        id: '1',
        name: 'Fade to black'
      },
      {
        id: '2',
        name: 'Back to black'
      }
    ]

    it('Should return a play action for the winner', () => {
      expect(clone.next(contenders).value).toEqual(
        put(playTrack(contenders[0]))
      )
    })

    it('Should put the contenders in the previous list', () => {
      expect(clone.next().value).toEqual(put(addToPrevious(contenders[0])))
      expect(clone.next().value).toEqual(put(addToPrevious(contenders[1])))
    })

    it('Should add the next 2 tracks in the queue as contenders', () => {
      expect(clone.next().value).toEqual(select(getNextContenders))
      expect(clone.next(nextContenders).value).toEqual(
        put(addToBattle(nextContenders[0]))
      )
      expect(clone.next().value).toEqual(put(addToBattle(nextContenders[1])))
    })

    it('Should notify the guests that the battle changed', () => {
      expect(clone.next().value).toEqual(call(notifyBattleUpdate))
    })
  })

  describe('multiple contenders (equality / choose contender 2)', () => {
    const clone = gen.clone()
    const contenders = [
      {
        id: '134',
        name: 'Never gonna give you up',
        votes: ['a', 'b']
      },
      {
        id: '456',
        name: 'O fortuna',
        votes: ['c', 'd'] // Winner
      }
    ]
    const nextContenders = [
      {
        id: '1',
        name: 'Fade to black'
      },
      {
        id: '2',
        name: 'Back to black'
      }
    ]

    it('Should return a play action for the winner', () => {
      expect(clone.next(contenders).value).toEqual(
        put(playTrack(contenders[1]))
      )
    })

    it('Should put the contenders in the previous list', () => {
      expect(clone.next().value).toEqual(put(addToPrevious(contenders[0])))
      expect(clone.next().value).toEqual(put(addToPrevious(contenders[1])))
    })

    it('Should add the next 2 tracks in the queue as contenders', () => {
      expect(clone.next().value).toEqual(select(getNextContenders))
      expect(clone.next(nextContenders).value).toEqual(
        put(addToBattle(nextContenders[0]))
      )
      expect(clone.next().value).toEqual(put(addToBattle(nextContenders[1])))
    })

    it('Should notify the guests that the battle changed', () => {
      expect(clone.next().value).toEqual(call(notifyBattleUpdate))
    })
  })
})
