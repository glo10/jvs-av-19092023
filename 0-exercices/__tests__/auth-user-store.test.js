import { describe, it, expect, vi } from 'vitest'
import AuthUserStore from '../4-exercice/correction/src/js/auth-user-store'
import fileFetch from 'file-fetch'
import { signUpFormSrc } from './utilities'
import Store from '../4-exercice/correction/src/js/store'

const signInForm = await fileFetch(signUpFormSrc).then(res => res.text())
describe.skip('Testing store', () => {
  it('Should have user on session storage on submission of form', () => {
    // Arrange
    document.body.innerHTML = signInForm
    document.querySelector('[type=email]').value = 'contact@tshimini.fr'
    document.querySelector('[name=password]').value = '1234'
    const expected = JSON.stringify({
      email: 'contact@tshimini.fr'
    })
    const store = new Store()
    const storeMock = vi.spyOn(store, 'toSession')
    storeMock.mockImplementationOnce(() => JSON.stringify(expected))
    const authStore = new AuthUserStore()
    authStore.onSubmit()
    console.log('store', sessionStorage.__STORE__)
    expect(localStorage.__STORE__.user).to.equals(expected)
    expect(store).toHaveBeenCalled()
  })
})
