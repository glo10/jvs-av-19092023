import { createServer } from 'node:http'
import { resolve } from 'node:path'
import Database from './db.mjs'
import reqs from './user-table-requests.mjs'


console.info('server on http://localhost:8000')
const http = createServer().listen(7000) // création d'un serveur web qui écoute sur le port 7000
const headers = { 'Content-Type': 'application/json' }
const dbFile = resolve('0-exercices/9-exercice', 'correction', 'app-db.sqlite') // résolution du path pour avoir le chemin de la base de données sqlite embarquée
let db = new Database(dbFile, reqs)

// l'ordre n'a pas d'importance dans le fichier tout est asynchrone et événementiel
http.on('close_db_connection', () => {
  db.end() // fermeture de la connexion à la bdd
})

// Traitement d'une requête depuis le serveur d'écoute sur le port 7000
http.on('request', async (req, res) => { // dès qu'un client effectue une req
  req.setEncoding('utf8')
  if (/post/i.test(req.method)) { // request avec la méthode HTTP POST
    db = await db.connect() // connexion à la bdd

    if (/\/signup$/.test(req.url)) { // inscription
      req.on('data', (data) => {
        http.emit('subscribe', data, res) // event subscribe qui va s'exécuter
      })
    } else { // mauvaise requête côté client
      http.emit('not_found', '{"message":"wrong endpoint"}', res)
    }
  } else { // Pas une méthode POST
    http.emit('not_found', '{"message":"wrong HTTP Method"}', res)
  }
})

http.on('subscribe', async (data, res) => { // à l'écoute de l'événment subscribe
  data = JSON.parse(data)
  data = [
    data.lastname,
    data.firstname,
    data.email,
    data.password,
    data.age,
    data.country,
    data.city,
    data.cityLatitude,
    data.cityLongitude
  ]

  // cherche à insérer un user dans la bdd
  db.instance.run(db.requests.insert, data, (error) => {
    if (error) { // insertion non réussi
      http.emit('not_found', '{"message":"user already exists"}', res)
    } else { // insertion réussi
      http.emit('success', '{"message":"success"}', res) // emission de l'événement success
    }
  })
})

http.on('success', (data, res) => { // à l'écoute de l'évément success
  res.writeHead(201, headers) // préparation de l'en-tête de la réponse 201 = ressource crée
  res.write(data) // écriture de la réponse
  res.end() // fin de l'écriture de la réponse et donc retour de la réponse au client (le navigateur ou postman)
  http.emit('close_db_connection') // emission de l'événement pour fermer la connexion à la base de données
})

http.on('not_found', (data, res) => { // à l'écoute de l'événement not found
  res.writeHead(404, headers)
  res.write(data)
  res.end()
  http.emit('close_db_connection')
})
