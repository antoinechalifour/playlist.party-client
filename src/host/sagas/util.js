import { call } from 'redux-saga/effects'

export const createClassInstance = (someClass, ...args) =>
  call(() => new someClass(...args))
