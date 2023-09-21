import { createServer } from 'node:http'
import Auth from './auth.mjs'
import Db from '../../9-exercice/correction/db.mjs'
import reqs from '../../9-exercice/correction/user-table-requests.mjs'
import { resolve } from 'node:path'
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}
const file = resolve('0-exercices/9-exercice', 'correction', 'app-db.sqlite') // résolution du path pour avoir le chemin de la base de données sqlite embarquée
const db = new Db(file, reqs)

console.log('Listen on http://localhost:8000')
const http = createServer((req, res) => {
  if (/^post$/i.test(req.method)) {
    /**
     * match retourne un tableau avec toutes les occurrences qui ont matché avec le pattern
     * le point ? notation courte qui évite une répétition de l'expression à sa gauche
     * at(0) est similaire à [0]
    */
    const rgx = (req.url.match(/(signup|signin)$/gi))?.at(0)
    switch (rgx) {
      case 'signin':
        http.emit('signin', req, res)
        break
      case 'signup':
        http.emit('signup', req, res)
        break
      default:
        http.emit('not_found', req, res)
        break
    }
  }
}).listen(8000)

http.on('signin', (req, res) => {
  render(req, res, 200)
})

http.on('signup', (req, res) => {
  render(req, res, 201)
})

const render = async (req, res, code) => {
  const auth = new Auth(db)
  req.on('data', async (data) => {
    data = data.toString()
    const user = JSON.parse(data)
    auth.authentificate(user)
      .then(data => {
        return JSON.parse(data)
      })
      .catch(error => {
        return error
      })
      .then(result => {
        console.log('res server', result)
        if (result.message === 'success') {
          res.writeHead(code, headers)
        } else {
          res.writeHead(404, headers)
        }
        res.end(JSON.stringify(result))
      })
  })
}
