import { describe, it, expect, vi } from 'vitest'
import CityWeather from '../2-exercice/correction/src/js/city-weather'
import { fetchMockJson } from './utilities'
global.fetch = vi.fn()

describe('Exercice 2 : weather', () => {
  it('Should get weather from latitude and longitude', async () => {
    const city = {
      country: 'France',
      city: 'Paris',
      latitude: 10,
      longitude: 20
    }
    document.body.innerHTML = '<header></header>'
    const weather = (new CityWeather(city))
    document.body.append(weather)
    const response = {
      current_weather: {
        temperature: 35
      }
    }
    const expected = { ...city, temperature: response.current_weather.temperature }
    await fetch.mockResolvedValue(fetchMockJson(response))
    await weather.get(10, 20)
    expect(fetch).toHaveBeenCalledWith(
      'https://api.open-meteo.com/v1/forecast?latitude=10&longitude=20&current_weather=true'
    )
    expect(weather.city).toStrictEqual(expected)
  })

  it('Should not get weather from latitude and longitude', async () => {
    const city = {
      country: 'France',
      city: 'Paris',
      latitude: 10,
      longitude: 20
    }
    document.body.innerHTML = '<header></header>'
    const weather = (new CityWeather(city))
    document.body.append(weather)
    const response = {
      ...city,
      temperature: 'Impossible d\'obtenir la température de la ville'
    }
    await fetch.mockResolvedValue(fetchMockJson(response))
    await weather.get(10, 20)
    expect(fetch).toHaveBeenCalledWith(
      'https://api.open-meteo.com/v1/forecast?latitude=10&longitude=20&current_weather=true'
    )
    expect(weather.city).toStrictEqual(response)
  })
})
