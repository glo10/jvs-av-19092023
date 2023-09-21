import { describe, it, afterEach, vi, beforeAll } from 'vitest'
import Store from '../4-exercice/correction/src/js/store'

const mock = vi.fn(() => ({
  setItem: vi.fn((key, value) => {
    this[key] = value
    return this
  }),
  getIem: vi.fn((key) => this[key] !== undefined ? this[key] : null)
}))

describe.skip('Client storage testing', () => {
  beforeAll(() => {
    vi.stubGlobal('sessionStorage', mock)
    vi.stubGlobal('localStorage', mock)
  })

  afterEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    vi.restoreAllMocks()
  })

  it('should save object on SessionStorage', () => {
    // Arrange
    const store = new Store()
    // Act
    store.save(sessionStorage, 'user', { lastname: 'tshimini', firstname: 'Glodie' })
    // Assert
    expect(sessionStorage).toHaveBeenLastCalledWith('user')
    expect(typeof sessionStorage.__STORE__.user).toBe('String')
  })

  it('should save a string on sessionStorage', () => {
    // Arrange
    const store = new Store()
    // Act
    store.save(sessionStorage, 'hello', 'world')
    // Assert
    expect(sessionStorage.setItem).toHaveBeenCalledWith('hello')
    expect(sessionStorage.__STORE__.hello).toEqual('world')
  })

  it('should save object on localStorage', () => {
    // Arrange
    const store = new Store()
    const user = {
      lastname: 'Tshimini',
      firstname: 'Glodie',
      age: 31
    }
    // Act
    store.save(localStorage, 'user', user)
    // Assert
    const result = JSON.stringify(user)
    expect(localStorage.setItem).toHaveBeenCalledWith('user', result)
    expect(localStorage.__STORE__.user).toEqual(result)
  })
})
