# Exercice 11 : communication front et back

---

## Modalités

- **Effectuez les modifications d'interfaces utisateur sans recharger la page web (Single Page Application (SPA))**
- Utilisez JQuery pour faire vos requêtes asynchrones vers le serveur Node JS. Vous pouvez vous appuyer sur les documentations suivantes :
- [Documentation W3schools](https://www.w3schools.com/jquery/jquery_ref_ajax.asp)
- [Documentation officielle JQuery](http://api.jquery.com/jquery.ajax/)

---

## Enoncé

1. Depuis le front office JS faites le lien avec le back-end pour l'authentification.
2. Stockez à l'aide de l'API Storage les informations renvoyées par le serveur Node lors d'une connexion réussie.
2. Effectuez les rédirections suivantes en implémentant les scenarios suivants.
3. Refactorisez votre code.

---

## Scénario 1

En tant qu'utilisateur anonyme ;

Lorsque, je demande à accéder à la page d'actualités ;

Alors, je devrais voir le contenu de la page de connexion s'afficher ;

---

## Scénario 2

En tant qu'utilisateur connecté ;

Lorsque, je viens tout juste de me connecter avec des indentifiants correctes ;

Alors, je devrais voir les actualités ;

---

## Scénario 3

En tant qu'utilisateur connecté ;

Lorsque, je demande à accéder à nouveau à la page de connexion ou d'inscription ;

Alors, les actualités doivent s'afficher ;

---

## Scenario 4

En tant qu'utilisateur connecté ;

Lorsque, je demande à me déconnecter ;

Alors, je devrais voir le contenu de la page connexion/inscription s'afficher ;

Et toutes les informations qui ont été stocké durant ma session doivent être supprimmées ;

<!-- 
---

## Aide pour consolider votre application

1. Stockez dans le localStorage le token retourné par le serveur.
2. Ajoutez dans les en-têtes (headers) le token dans vos requêtes en vous appuyant sur le code ci-après.
`
fetch(url, {
  headers: {
    Accept: 'application/json',
    Authentication: 'Bearer ***Token-here***',
    'X-Custom-Header': 'header value'
  }
})
   .then(resp => resp.json())
   .then(json => console.log(JSON.stringify(json)))
`

Vous pouvez télécharger le module [uuid](https://www.npmjs.com/package/uuid) pour générer des ID.
Créez un `middleware` au niveau de l'application front-end qui ajoute le `token` (`bearer token`) renvoyé par le serveur après l'authentification réussie.
- Permettre l'accès à la page d'actualité `news.html` uniquement si le `token` existe et qu'il est valide. La durée de validité du token est de 2h après le succès de l'authentification.
-->