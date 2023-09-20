class CityWeather extends HTMLElement {
  static temperature_format = /\d{2}(\.\d{1,2}\s+)?°C/
  constructor (city) {
    super()
    this.city = city
  }

  async connectedCallback () {
    await this.get()
    this.render()
  }

  render () {
    if (/\d+/.test(this.city.temperature)) {
      this.city.temperature += '° C'
    }
    this.innerHTML = `<p>${this.city.temperature}</p>`
  }

  async get () {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${this.city.latitude}&longitude=${this.city.longitude}&current_weather=true`)
    try {
      const data = await res.json()
      this.city = {
        ...this.city,
        temperature: data.current_weather.temperature
      }
    } catch (error) {
      this.city = {
        ...this.city,
        temperature: 'Impossible d\'obtenir la température de la ville'
      }
    }
  }
}
customElements.define('city-weather', CityWeather)
export default CityWeather
