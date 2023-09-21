class CityWeather extends HTMLElement {
  static temperature_format = /\d{2}(\.\d{1,2}\s+)?°.+C/
  constructor (city, dataFetch) {
    super()
    this.city = city
    this.dataFetch = dataFetch
  }

  connectedCallback () {
    this.get()
    this.render()
  }

  render () {
    if (/\d+/.test(this.city.temperature)) {
      this.city.temperature += '° C'
    }
    this.innerHTML = `<p>${this.city.temperature}</p>`
  }

  async get () {
    try {
      const data = await this.dataFetch.json(`https://api.open-meteo.com/v1/forecast?latitude=${this.city.latitude}&longitude=${this.city.longitude}&current_weather=true`)
      this.city = {
        ...this.city,
        temperature: data.current_weather.temperature
      } // exactement la même chose que this.city.temperature = data.current_weather.temparature
      /**
       * Plus parlant dans le cas de la création d'une nouvelle variable
        this.cityPlus = {
        ...this.city,
        temperature: data.current_weather.temperature
      }
      */

    } catch (error) {
        this.city.temperature = 'Impossible d\'obtenir la température de la ville'
    }
  }
}
customElements.define('city-weather', CityWeather)
export default CityWeather
