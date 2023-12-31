# Exercice 5 : plugin JQuery vérifications des données 

---

## Documentation

[Documentation pour créer un Plugin JQuery](https://learn.jquery.com/plugins/basic-plugin-creation/)

---

## Enoncé

1. Implémentez les scénarios suivant un créant un plugin JQuery permettant de vérifier les données d'un formulaire.

---

## Scénario 1

En tant qu'utilisateur ;

Lorsque, je souhaite m'inscrire ;

Et que je saisi une information incompatible avec le format attendu ;

Alors, je devrais avoir un message indiquant que le format est incorrecte ;

---

## Scénario 2

En tant qu'utilisateur ;

Lorsque, je souhaite m'inscrire ;

Et que je saisis une information compatible avec le format attendu d'un champ ;

Alors, je ne devrais pas avoir de message d'erreur lié au format du champ ;

---

## Spécifications techniques du plugin

- Pour chaque type de donnée, créez une fonction spécifique. Par exemple une fonction pour le traitement du mot de passe, une autre pour l'e-mail, prénom etc. Cf les détails ci-après.
Si vous êtes à l'aise avec les [Expressions régulières (Regex)](https://regexlearn.com/fr/learn/regex101) vous pouvez les utiliser à l'aide de la méthode *[test()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)* dans le cas contraire me demander de l'aide.

### Nom et prénom

- Au moins 2 caractères.
- Aucun chiffre.
- Espaces et le tiret du 6 (-) autorisées.
- `< > & $ + * / # ~ € % ^ ! @` interdites.

### Age

- Compris entre 14 et 130.

### Pays et villes

- Au moins 2 caractères.
- Chiffres autorisés.
- Espaces et tirets du 6 (-) autorisés.
- `& $ + * / # ~ € % ^ ! _ @` interdites.

### Email

- Les extensions doivent avoir au moins 2 caractères.
- Les extensions ne doivent pas avoir plus de 10 caractères.

### Mot de passe

- Le mot de passe doit contenir au moins 15 caractères.
- Le mot de passe doit contenir au maximum 36 caractères.
- Le mot de passe doit avoir au moins une lettre minuscule.
- Le mot de passe doit avoir au moins une lettre majuscule.
- Le mot de passe doit avoir au moins un chiffre.
- Le mot de passe doit avoir au moins un des caractères suivants  `& $ + - * / # ~ € % ^ ! - _`.