import initializeParty from './initializeParty'
import { call, take } from 'redux-saga/effects'
import { START_PARTY } from 'host/actions/party'
import startParty from 'host/sagas/startParty'

describe('initializeParty saga', () => {
  const gen = initializeParty()

  it('Should wait for a START_PARTY action', () => {
    expect(gen.next().value).toEqual(take(START_PARTY))
  })

  it('Should the trigger the startParty saga', () => {
    expect(gen.next().value).toEqual(call(startParty))
  })
})
