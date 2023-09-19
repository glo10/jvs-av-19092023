# Installations et dépendances

---

## Installations

Installations ci-dessous à faire uniquement si vous n'avez pas ces outils en local sur votre poste.

## Visual Studio Code

- [Téléchargement Visual Studio Code](https://code.visualstudio.com/download)

### Plugins Visual Studio Code

- Javascript (ES6) Code Snippets
- Node.js Extension Pack
- Node.js Modules Intellisense
- Node.js Exec
- Node.js Assertion Snippets
- Live Server
- JQuery Code Snippets
- DevTools for Chrome

## Node JS et NPM

- [Page téléchargement NodeJs prendre la version 18.12.1 LTS ou 19.1.0](https://nodejs.org/en/)

## Postman ou Hoppscotch pour faire des appels vers des APIs

- [Téléchargement Postman](https://www.postman.com/) ou [hoppscotch en ligne](https://hoppscotch.io/)

---

## Dépendances du projet

### Front-End

- `npm i -D babel/core babel/preset-en`
- `npm i -D standard`

Dans les settings de VSCODE `settings.json` ajouter les lignes suivantes :

`"standard.enable": true,
"standard.run": "onType",
"standard.autoFixOnSave": true
`

---

### Back-End

- `npm i bcryptjs`
- `npm i jsonwebtoken`
- `npm i sqlite3`