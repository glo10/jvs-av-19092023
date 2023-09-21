import AuthUserJQuery from '../../../../5-exercice/correction/src/js/auth-user-jquery'
import $ from 'jquery'
import Store from '../../../../4-exercice/correction/src/js/store'
import DataFetch from '../../../../3-exercice/correction/src/js/data-fetch'
import CurrentNewsStore from '../../../../4-exercice/correction/src/js/current-news-store'
import HeaderWeather from './header-weather'
export default class AuthFetchBackEnd extends AuthUserJQuery {
  blockReload () {
    $(window).on('beforeunload', function () {
      return false
    })
  }

  onSubmit () {
    // super.onSubmit()
    $('form').on('submit', (e) => {
      e.preventDefault()
      e.stopImmediatePropagation()
      const form = document.querySelector('form')
      /**
       * Récupère tous les champs du formulaire avec les valeurs et les transforment en JSON
       * Enfin on serialize l'objet en string pour pouvoir envoyer les données au back-end
      */
      const data = JSON.stringify(Object.fromEntries(new FormData(form).entries()))
      const endpoint = $('input[type=submit]').data('endpoint')
      $.ajax({
        method: 'POST',
        cache: false,
        url: `http://localhost:8000/${endpoint}`,
        data
      }).done((res) => {
        console.log('res ajax', res)
        delete res.message
        const store = new Store()
        const proxy = 'http://127.0.0.1:7000'
        store.user(res)
        this.dispatchEvent(new CustomEvent('testing'))
        if (endpoint === 'signin') {
          const { user } = res
          this.remove()
          const header = new HeaderWeather(
            store,
            new DataFetch(),
            {
              country: user.country,
              name: user.city,
              latitude: user.cityLatitude,
              longitude: user.cityLongitude
            }
          )
          document.querySelector('main').append(header)
          const feeds = [
            // { url: 'https://www.france24.com/fr/rss' },
            { url: 'https://www.lemonde.fr/rss/plus-lus.xml' }
          ]
          feeds
            .map(feed => {
              feed.url = `${proxy}/${feed.url}`
              console.log('feed map', feed)
              return feed
            })
            .forEach((feed) => {
              console.log('feed client foreach', feed)
              const news = new CurrentNewsStore(new DataFetch(), feed)
              document.querySelector('main').append(news)
            })
        } else {
          document.querySelector('[type=button]').dispatchEvent(new Event('click'))
        }
      }).fail(function (error) {
        console.log('error', error)
        const msg = error.responseJSON.message
        const pAlert = $('form>p.alert-danger')
        if (pAlert.length) {
          pAlert.text(msg)
        } else {
          const p = document.createElement('p')
          p.classList.add('alert', 'alert-danger', 'text-center')
          p.innerText = msg
          $('form').prepend(p)
        }
        $('html,body').animate({ scrollTop: 0 }, 'slow')
      })
    })
  }

  async connectedCallback () {
    this.blockReload()
    await super.connectedCallback()
    this.onSubmit()
  }
}
customElements.define('auth-fetch-backend', AuthFetchBackEnd)
