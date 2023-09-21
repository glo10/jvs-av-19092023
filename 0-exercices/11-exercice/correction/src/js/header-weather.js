import CityWeather from '../../../../2-exercice/correction/src/js/city-weather'
import DataFetch from '../../../../3-exercice/correction/src/js/data-fetch'
import AuthFetchBackEnd from './auth-fetch-backend'
import CountryCity from '../../../../3-exercice/correction/src/js/country-city'
export default class HeaderWeather extends CityWeather {
  constructor (store, dataFetch, city) {
    super()
    this.store = store
    this.dataFetch = dataFetch
    console.log('city header user', city)
    this.city = city
  }

  render () {
    this.dataFetch.html('../../../../1-exercice/correction/src/html/_partials/logout.html')
      .then(res => {
        this.innerHTML += res
        if (this.store.getUser()) {
          const { user } = this.store.getUser()
          this.innerHTML += `<p>Bienvenue ${user.firstname} ${user.lastname}</p>`
          this.innerHTML += `<p>${user.city} ${this.city.temperature}</p>`
        }
        this.disconnected()
      })
  }

  disconnected () {
    this.querySelector('img').addEventListener('click', () => {
      document.querySelector('main').append(this)
      this.store.logout()
      const auth = new AuthFetchBackEnd(
        '../../../../1-exercice/correction/src/html/_partials/sign-in.html',
        new DataFetch(),
        null,
        new CountryCity(
          '../data/countries.json',
          '../data/cities.json'
        )
      )
      console.log('auth', auth)
      this.remove()
      const allNews = document.querySelectorAll('current-news-store')
      allNews.forEach(news => news.remove())
      document.querySelector('main').append(auth)
    })
  }
}
customElements.define('header-weather', HeaderWeather)
