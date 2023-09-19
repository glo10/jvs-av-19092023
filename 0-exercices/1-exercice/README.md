# Exercice 1 : gestion des événements sur le formulaire de connexion avec un CustomElement

---

## Modalités

- **Regardez la vidéo de la présentation du travail final depuis le fichier** [exercice1-connexion.mp4](../ressources/videos/app-1.mp4)
- **Ne pas modifier le HTML ou CSS directement**.
- **Dans la page index.html fournit, vous devez uniquement insérer la de votre fichier js à l'aide de l'attribut `src` de la balise `<script>` comme vous avez l'habitude de faire**.
- **Toutes les modifications doivent se faire à travers JavaScript**.
- **Utilisez un CustomElement**.
- **Lancer votre code à l'aide de l'extension live server de Visual Studio Code**

---

## Enoncé

1. Récupérez depuis le dossiers ressources le zip [src.zip](../ressources/src.zip) contenant les pages HTML et des feuilles de style CSS nécessaires à la réalisation de l'exercice.

2. Créez un ou plusieurs fichiers js permettant de répondre aux spécifications suivantes.

---


## Spécifications techniques pour les scénarios 1 à 4

- Le message d'aide qui doit apparaître lors de la saisie devrait avoir une classe CSS `form-help`.
- Recopiez le contenu HTML présent dans les ressources `template/_html/_partial/signin.html` pour le rendu HTML de votre *CustomElement*.

---

## Scénario 1

En tant qu'utilisateur ;

Lorsque, j'ai le focus sur le champ e-mail ;

Alors, le message d'aide suivant devrait apparaître au-dessus du champ e-mail "Veuillez saisir votre adresse e-mail" ;

---

## Scénario 2

En tant qu'utilisateur ;

Lorsque, j'ai le focus sur le champ mot de passe ;

Alors, le message d'aide suivant devrait apparaître au-dessus du champ de mot passe "Veuillez saisir votre mot de passe" ;

---

## Scénario 3

En tant qu'utilisateur ;

Lorsque, je perds le focus sur le champ e-mail ;

Alors, le message d'aide "veuillez saisir votre adresse e-mail" devrait disparaître ;

---

## Scénario 4

En tant qu'utilisateur ;

Lorsque, je perds le focus sur le champ mot de passe ;

Alors, le message d'aide "veuillez saisir votre mot de passe" devrait disparaître ;

---

## Scénario 5

En tant qu'utilisateur ;

Lorsque, je ne remplis pas l'e-mail et/ou le mot de passe ;

Et que je demande à soumettre le formulaire ;

Alors, le message suivant "email et/ou mot de passe obligatoires" devrait apparaître;
Et la soumission du formulaire devrait être bloquée.


### Spécifications techniques uniquement pour le scénario 5

- Le message "email et mot de passe obligatoires" doit apparaître au dessus du formulaire.
- L'élément parent contenant le message doit avoir la classe CSS `alert alert-danger`.

---

## Scénario 6

En tant qu'utilisateur ;

Lorsque, je remplis l'e-mail et le mot de passe ;

Et que je demande à soumettre le formulaire ;

Alors, je devrais pouvoir le faire;

Et il ne devrait pas avoir le message "email et/ou mot de passe obligatoires" ;

