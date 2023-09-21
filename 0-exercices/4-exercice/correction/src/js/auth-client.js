import AuthUserStore from './auth-user-store'
import CountryCity from '../../../../3-exercice/correction/src/js/country-city'
import DataFetch from '../../../../3-exercice/correction/src/js/data-fetch'
window.onload = () => {
  const authStore = new AuthUserStore(
    './_partials/sign-in.html',
    new DataFetch(),
    null,
    new CountryCity(
      '../data/countries.json',
      '../data/cities.json'
    )
  )
  document.querySelector('main').append(authStore)
}
