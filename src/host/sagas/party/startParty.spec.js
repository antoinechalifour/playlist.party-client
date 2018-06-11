import { call, put, select } from 'redux-saga/effects'
import { getContenders, getPlayer } from 'host/reducers'
import startParty from './startParty'
import { triggerVote } from 'host/actions/tracks'

describe('startParty saga', () => {
  it('Should ignore the event when no contenders have been added', () => {
    const gen = startParty()
    const contenders = []

    expect(gen.next().value).toEqual(select(getContenders))
    expect(gen.next(contenders).done).toBe(true)
  })

  it('Should trigger the vote otherwise', () => {
    const gen = startParty()
    const contenders = [
      {
        id: '1',
        name: 'Fear of the Dark'
      },
      {
        id: '2',
        name: 'Rei'
      }
    ]

    expect(gen.next().value).toEqual(select(getContenders))
    expect(gen.next(contenders).value).toEqual(put(triggerVote()))
  })
})
