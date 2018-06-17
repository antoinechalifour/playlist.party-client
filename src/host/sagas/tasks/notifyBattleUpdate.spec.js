import { call, select } from 'redux-saga/effects'
import { getAllChannels, getContenders } from 'host/reducers'
import notifyBattleUpdate from './notifyBattleUpdate'

describe('notifyBattleUpdate saga', () => {
  const gen = notifyBattleUpdate()
  const channels = [
    {
      send: jest.fn()
    },
    {
      send: jest.fn()
    }
  ]
  const contenders = [
    {
      id: '0',
      name: 'Never gonna give you up'
    },
    {
      id: '1',
      name: 'The trooper'
    }
  ]

  it('Should get all channels', () => {
    expect(gen.next().value).toEqual(select(getAllChannels))
  })

  it('Should get all contenders', () => {
    expect(gen.next(channels).value).toEqual(select(getContenders))
  })

  it('Should send the contenders to all channels', () => {
    const message = {
      type: 'battle/update',
      payload: {
        tracks: contenders
      }
    }
    expect(gen.next(contenders).value).toEqual(
      call([channels[0], channels[0].send], JSON.stringify(message))
    )
    expect(gen.next(contenders).value).toEqual(
      call([channels[1], channels[1].send], JSON.stringify(message))
    )
    expect(gen.next().done).toBe(true)
  })
})
