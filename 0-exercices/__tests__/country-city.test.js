import { describe, it, afterEach, vi, beforeEach } from 'vitest'
import CountryCity from '../3-exercice/correction/src/js/country-city'
import { countries, cities } from './utilities'
global.fetch = vi.fn()
describe('Exercice 3 : countries and cities', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <input type="text" name="country"/>
    <input type="text" name="city"/>
    `
  })

  afterEach(() => {
    document.body.innerHTML = ''
    vi.fn().mockReset()
  })

  it('Should get countries', async () => {
    // Arrange
    const cc = new CountryCity()
    const spy = vi.spyOn(cc, 'getCountries')
    spy.mockImplementationOnce(() => new Promise((resolve) => resolve(countries)))
    // Act
    const res = await cc.getCountries()
    // Assert
    expect(spy).toHaveBeenCalledTimes(1)
    expect(res).toEqual(countries)
  })

  it('Should get cities from france', async () => {
    // Arrange
    const cc = new CountryCity()
    const spy = vi.spyOn(cc, 'getCitiesFrom')
    spy.mockImplementationOnce(() => new Promise((resolve) => resolve(cities[0])))
    // Act
    await cc.getCitiesFrom('france')
    // Assert
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('Should replace input by select with countries ', async () => {
    // Arrange
    const cc = new CountryCity()
    const spy = vi.spyOn(cc, 'getCountries')
    spy.mockImplementationOnce(() => new Promise((resolve) => resolve(countries)))
    // Act
    const res = await cc.getCountries()
    cc.replaceInputBySelect(document.querySelector('input'), 'Choisir un pays', res)
    // Assert
    expect(document.querySelector('select[name=country]').options.length).toBe(5)
  })
})
