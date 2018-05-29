export default class Store {
  constructor () {
    this.listeners = []
  }

  subscribe (listener) {
    this.listeners.push(listener)

    return this.listeners.filter(x => x !== listener)
  }

  notify (event) {
    this.listeners.forEach(listener => listener(event))
  }
}
