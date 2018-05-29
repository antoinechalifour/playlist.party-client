import Store from './Store'

describe('Store', () => {
  it('Should notify registered listeners', () => {
    const listener1 = jest.fn()
    const listener2 = jest.fn()
    const store = new Store()
    const event = { type: 'test' }

    store.subscribe(listener1)
    store.subscribe(listener2)

    store.notify(event)

    expect(listener1.mock.calls.length).toEqual(1)
    expect(listener1.mock.calls[0]).toEqual([event])
    expect(listener2.mock.calls.length).toEqual(1)
    expect(listener2.mock.calls[0]).toEqual([event])
  })
})
