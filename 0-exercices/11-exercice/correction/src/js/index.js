import AuthFetchBackEnd from './auth-fetch-backend'
import DataFetch from '../../../../3-exercice/correction/src/js/data-fetch'
import CountryCity from '../../../../3-exercice/correction/src/js/country-city'
import Store from '../../../../4-exercice/correction/src/js/store'
import HeaderWeather from './header-weather'
import CurrentNewsStore from '../../../../4-exercice/correction/src/js/current-news-store'
window.onload = (event) => {
  event.target.addEventListener('testing', function (e) {
    console.log('event news', e)
  })
  const store = new Store()
  const proxy = 'http://127.0.0.1:7000'
  const user = store.getUser()
  console.log('user', user)
  if (user) { // session utisateur existe donc affichage de news
    const u = user.user
    const header = new HeaderWeather(
      store,
      new DataFetch(),
      {
        country: u.country,
        name: u.city,
        latitude: u.cityLat ?? 48,
        longitude: u.cityLong ?? 2
      }
    )
    document.querySelector('body').prepend(header)
    const feeds = [
      { url: 'https://www.france24.com/fr/rss' },
      { url: 'https://www.lemonde.fr/rss/plus-lus.xml' }
    ]
    feeds
      .map(feed => {
        feed.url = `${proxy}/${feed.url}`
        return feed
      })
      .forEach((feed) => {
        const news = new CurrentNewsStore(new DataFetch(), feed)
        document.querySelector('main').append(news)
      })
  } else { // pas de session utilisateur => authentification
    const auth = new AuthFetchBackEnd(
      '../../../../1-exercice/correction/src/html/_partials/sign-in.html',
      new DataFetch(),
      null,
      new CountryCity(
        '../data/countries.json',
        '../data/cities.json'
      )
    )
    document.querySelector('main').append(auth)
  }
}
