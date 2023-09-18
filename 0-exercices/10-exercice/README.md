# Exercice 10 : gestion de la connexion

---

## Modalités

- Effectuez vos tests via **`postman`** ou **`hoppscotch`** dans un premier, le lien entre le front et le back-end sera effectué plus tard.
- Utilisez l'extension **`SQLite Viewer`** d'`alexcvzz` pour visualiser votre base de données (schéma et données).
- Partez de l'exercice 10

---

## Enoncé

1. Gérez la connexion d'un utilisateur.

---

## Spécifications techniques pour la connexion

- Le serveur exécute les requêtes de connexion avec la méthode `POST` et l'*url* `http://localhost:8000/signin`.
- Retournez une réponse au format JSON `{"message": "success"}` avec un status 200 pour Un utilisateur qui demande de se connecter avec la bonne adresse email et le bon mot de passe. 
- Dans le cas contraire, `{"message": "email or password incorrect"}` et status 404.