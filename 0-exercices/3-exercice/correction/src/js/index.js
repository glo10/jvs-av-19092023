import AuthUser from './auth-user'
import CountryCity from './country-city'
import DataFetch from './data-fetch'
window.onload = () => {
  const auth = new AuthUser(
    './_partials/sign-in.html',
    new DataFetch(),
    null,
    new CountryCity(
      '../data/countries.json',
      '../data/cities.json'
    )
  )
  document.querySelector('main').append(auth)
}
