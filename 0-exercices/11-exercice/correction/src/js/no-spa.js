import Store from '../../../../4-exercice/correction/src/js/store.js'
const store = new Store()
if (store.getUser() === null) {
  location.href = './'
}

const disconnected = () => {
  const store = new Store()
  document.querySelector('header img').addEventListener('click', () => {
    store.logout()
    location.href = './'
  })
}
disconnected()
