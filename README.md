# AssignmentApp

## Participants
  - Andriamamonjy Hoby Arivony ( N°03 )
  - Rasoanaivo Gino Allison ( N°52 )
## Description du projet
Le projet consiste à la gestion de devoirs ( assignments ) .
La plateforme peut être accéder par trois profils différents :
  - L'administrateur : pouvant éditer et supprimer les assignments
  - Le professeur : pouvant marquer un assignment comme rendu
  - L'étudiant : pouvant créer un ou plusieurs assignment(s).
La plateforme est accessible uniquement après s'être connecté.

## Fonctionnalités disponibles
  - Login : utilisant JWT
  - Sidebar et toolbar
  - Liste des assignments
  - Création d'assignments
  - Image d'illustration pour les matières et les profs

### Login de test 
  - Admin :
    - login : admin
    - mot de passe : password
  - Professeur :
    - login : prof
    - mot de passe : password
  - Etudiant :
    - login : gino1
    - mot de passe : password

## Contributions
  - Gino :
      - Connexion
      - Génération de données
      - Participation à l'amélioration de l'affichage
      - Création collection postman
  - Hoby :
      - Création d'assignments
      - Sidebar et toolbar
      - Participation à l'amélioration de l'affichage
   
## Installer le projet sur son local 
Pour installer le projet localement : 
  - Cloner les deux dépôts sur github ( le back et le front )
  - Dans chaque dossier , lancer **npm install**
  - Mettre à jour les urls dans les services pour que ça concorde avec l'url de l'api ( par défaut localhost:8010 )
  - Mettre à jour le lien vers la base dans le dépôt de l'api
  - Lancer l'api ( server.js )
  - Créer des utilisateurs à partir de la collection Postman ( disponible dans le dépôt de l'api )
  - Lancer l'application front ( ng serve --open ) une fois que tout est bien connecté

## Codes 
  - Le sidebar ainsi que le toolbar ont été inspirer de la documentation officielle de material 

## Liens
  - Lien angular front : https://front-api-3ag8.onrender.com/
  - Lien api back : https://back-api-nfim.onrender.com/

