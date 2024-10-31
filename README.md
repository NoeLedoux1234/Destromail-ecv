# Destromail

## Description

**Destromail** est une API de gestion de tâches intégrant un service d'envoi de courriels de notifications. Elle permet de créer, consulter, mettre à jour et supprimer des tâches, et envoie une notification par email chaque fois qu'une tâche est créée, mise à jour ou supprimée.

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Tests](#tests)
- [Technologies utilisées](#technologies-utilisées)
- [Contribuer](#contribuer)
- [Licence](#licence)

## Fonctionnalités

- **CRUD des tâches** : Créer, lire, mettre à jour et supprimer des tâches.
- **Notifications par email** : Envoie une notification par courriel pour chaque action sur les tâches.
- **Base de données en mémoire** : Utilisation d'une base de données temporaire pour le stockage des tâches.
- **Tests unitaires** : Test complet de l'API et des fonctionnalités avec Jest.

## Prérequis

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [npm](https://www.npmjs.com/get-npm)
- Un compte [Ethereal](https://ethereal.email/) ou autre service d'email pour la configuration des emails.

## Installation

Clonez le dépôt, puis installez les dépendances du projet :

```bash
cd Destromail
npm install
