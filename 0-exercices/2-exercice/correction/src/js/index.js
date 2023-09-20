import DataFetch from '../../../../3-exercice/correction/src/js/data-fetch.js'
import Weather from './city-weather.js'
import CurrentNews from './current-news.js'

// Lors du chargement de la page
window.onload = () => {
  const proxy = 'http://127.0.0.1:7000'
  // scenario 1 : meteo
  const w = new Weather({
    country: 'France',
    name: 'Paris',
    latitude: 48.8534,
    longitude: 2.3488
  })
  // Ajout du customElement dans notre DOM
  document.querySelector('header').prepend(w)
  // Scenario 2 et 3 : news et modal
  const feeds = [
    { url: 'https://www.france24.com/fr/rss' },
    { url: 'https://www.lemonde.fr/rss/plus-lus.xml' }
  ]

  feeds.forEach(f => {
    f.url = `${proxy}/${f.url}`
    const feed = new CurrentNews(new DataFetch(), f)
    document.querySelector('main').append(feed)
    /**
     * Juste pour pouvoir apercevoir le loader pour simuler un traitement long
     * En production il faut retirer le setTimeout
     */
    setTimeout(async () => {
      feed.render()
    }, 3000)
  })
}
