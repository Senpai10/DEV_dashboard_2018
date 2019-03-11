# Dashboard

We have to create our own Dashboard with some widgets and services (Google, Steam, Github, Office 365, etc.). This project allow us to discover new language and tools through the creation and use of a web service.

> Dashboard is a user interface that, somewhat resembling an automobile's dashboard, organizes and presents information in a > way that is easy to read. However, a computer dashboard is more likely to be interactive than an automobile dashboard
> (unless it is also computer-based). To some extent, most graphical user interfaces (GUIs) resemble a dashboard. However,
> some product developers consciously employ this metaphor (and sometimes the term) so that the user instantly recognizes
> the similarity.

# Language

  - Java
  - .NET
  - node.js


### Requirement

* [Docker] - Docker is a platform for developers and sysadmins to develop, deploy, and run applications with containers. 
* [MangoDB] - MongoDB is an open-source document database and leading NoSQL database. 
* [NPM] - NPM is the package manager for JavaScript and the world’s largest software registry
* [Node.js] - As an asynchronous event driven JavaScript runtime, Node is designed to build scalable network applications.

### Routes

| Routes | Functionalities |
| ------ | ------ |
| /users/register | GET the page to register |
| /users/login | GET the page to login |
| /users/profile | GET our profile |
| /api/weatherWidget | GET the weather Widget |
| /api/steam/userInfo | GET information About Steam |
| /api/createWidget | POST new widgets in database |
| /api/getWidgets | GET list of all widgets in database for one user |
| /api/removeWidgets | GET the action to remove the widgets |
| /about.json | GET the json file describing widgets and services |

### Widgets

A widget is an element of a graphical user interface (GUI) that displays information or provides a specific way for a user to interact with the operating system or an application. 

| Widgets | Functionalities |
| ------ | ------ |
| Steam - Recently Played Games | Get our games recently played on Steam |
| Steam - Get Owned Game | Get a specific game |
| Clash Royale Chest | Get upcoming chest |
| Clash Royale Clan | Get information clan |
| Currency Exchange Rate | Get the currency exchange rate |
| See the Weather | Allow us to see the city's weather |
| Remove Widgets | Remove all widgets |

### Service

| Services | Functionalities |
| ------ | ------ |
| Google | Authentification Google |
| Steam | Authentification Steam |
| Github | Authentification Github |

### Compilation

```sh
$ docker-compose build && docker-compose up
```



**Authors**

Guilhem AMARDEILH
Charly DAI



   [node.js]: <http://nodejs.org>
   [DOcker]: <https://www.docker.com/>
   [NPM]: <https://www.npmjs.com/>
   [MangoDB]: <https://www.mongodb.com/fr>

