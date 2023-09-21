import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

export default class Auth {
  constructor (db) {
    this.db = db
  }

  authentificate (user) {
    if (Object.hasOwn(user, 'age')) {
      return this.signup(user)
    } else {
      return this.signin(user)
    }
  }

  async signup (user) {
    console.log('user backend', user)
    const hashing = hash(user.password, 12)
      .then(hash => {
        user = [
          user.lastname,
          user.firstname,
          user.email,
          hash, // remplacer le mot de passé saisi par la hash généré
          user.age,
          user.country,
          user.city,
          user.cityLatitude,
          user.cityLongitude
        ]
        return user
      })
    const dbConnect = this.db.connect()
    return Promise.all([hashing, dbConnect])
      .then(results => {
        const user = results[0]
        const db = results[1]
        try {
          return new Promise((resolve, reject) => {
            db.instance.run(db.requests.insert, user, error => {
              if (error) {
                console.log('error insert', error)
                reject(JSON.stringify({ message: 'user already exists' }))
              } else {
                resolve(JSON.stringify({ message: 'success' }))
              }
            })
          })
        } catch (error) {
          console.log('error database', error)
          return error
        } finally {
          db.end()
        }
      })
      .catch(error => error)
  }

  signin (user) {
    return this.db.connect()
      .then((db) => { // connexion à la base de données avec succès
        return new Promise((resolve, reject) => {
          try {
            db.instance.get(db.requests.select, [user.email], (error, row) => {
              if (row) {
                resolve(JSON.stringify(row))
              } else {
                /**
                 * Ici une petite modification du message d'erreur pour éviter de remonter des erreurs
                 * qui pourrait donner des indications pouvant aider un utilisateur mal intentionné
                */
                if (error !== null) {
                  error = {
                    message: 'something has gone wrong, please contact us'
                  }
                }
                reject(JSON.stringify({ message: 'unknown user', error }))
              }
            })
          } catch (error) {
            return error
          } finally {
            db.end()
          }
        })
      })
      .then(row => { // Resultat de la promesse qui s'est bien résolu avec resolve et donc qui contient row
        row = JSON.parse(row)
        return new Promise((resolve, reject) => {
          return compare(user.password, row.password, (error, res) => {
            if (error) reject(JSON.stringify({ message: 'something bad happened, try again !' }))
            if (res) resolve({ comparaison: res, row })
            reject(JSON.stringify({ message: 'unknown user' }))
          })
        })
      })
      .then(result => { // promesse précédente lorsqu'elle est résolue retourne un booléen
        const { comparaison, row } = result
        if (comparaison) {
          // c'est vrai on crée un token a retourné au client qui sera valable 2h
          const token = jwt.sign(
            {
              id: row.id,
              email: row.email
            },
            'u8B>FU^Yn,ACnP2p=uFd1NgJsAbfvYkiCmfwGks0!9Wuc]Mn', // SECRET à mettre le plus long et compliqué possible
            { expiresIn: '2h' }
          )
          delete row.ID
          delete row.password // supprimer le mot de passe des propriétés à renvoyer au client
          return JSON.stringify({ message: 'success', user: row, token })
        }
      })
      .catch(error => {
        return error
      })
  }
}
