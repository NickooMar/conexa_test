
# PRUEBA TÉCNICA CONEXA

Proyecto de prueba técnica que implementa una arquitectura de microservicios utilizando Nestjs basada en la arquitectura orientada a eventos (Event-Driven Architecture, EDA). Este sistema permite gestionar películas usando la API publica de Star Wars, además de incluir funcionalidades de creación de usuarios, autenticación y control de acceso mediante roles.

📝 Requisitos del Proyecto

El backend permite gestionar películas de Star Wars e incluye:

    Sistema de autenticación y autorización usando JWT.
    Gestión de usuarios, con distintos roles: "Usuario Regular" y "Administrador".
    Endpoints para gestionar películas con permisos específicos.
    Sincronización de datos con la API pública de Star Wars.
    Documentación de API mediante Swagger.
    Pruebas unitarias para la funcionalidad de la API.

🚀 Tecnologías Utilizadas

    NestJS: Framework para Node.js.
    JWT: Para autenticación y autorización.
    Swagger: Para documentar la API.
    TypeORM: Para la interacción con la base de datos (PostgreSQL).
    Jest: Para las pruebas unitarias.
## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```
    
## API Reference


#### Post Signup

```http
  POST /api/auth/signup
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required** - **Unique**. User email |
| `username` | `string` | **Required** - **Unique**. Username |
| `password` | `string` | **Required**. User password |
| `confirmPassword` | `string` | **Required**. password confirmation |


#### Post Signin

```http
  POST /api/auth/signin
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required** - **Unique**. User email |
| `password` | `string` | **Required**. User password |


#### Get all movies

```http
  GET /api/movies
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |


#### Get movie

```http
  GET /api/movies/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| `id`      | `string` | **Required**. Id of item to fetch |


#### Create movie

```http
  POST /api/movies
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| `title`      | `string` | **Required**. Title to create |
| `episode_id`      | `number` | The episode number of this film. |
| `opening_crawl`      | `string` | The opening paragraphs at the beginning of this film. |
| `director`      | `string` |  The name of the director of this film. |
| `producer`      | `string` | The name(s) of the producer(s) of this film. Comma separated. |
| `release_date`      | `string` | The ISO 8601 date format of film release at original creator country. |
| `species`      | `array` | An array of species resource URLs that are in this film. |
| `starships`      | `array` | An array of starship resource URLs that are in this film. |
| `vehicles`      | `array` | An array of vehicle resource URLs that are in this film. |
| `characters`      | `array` | An array of people resource URLs that are in this film. |
| `planets`      | `array` |  An array of planet resource URLs that are in this film. |
| `url`      | `string` | the hypermedia URL of this resource. |
| `created`      | `string` |  the ISO 8601 date format of the time that this resource was created. |
| `edited`      | `string` |  the ISO 8601 date format of the time that this resource was edited. |


#### Update movie

```http
  PATCH /api/movies
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| `id` | `string` | **Required**. Id of the item to fetch |
| `title`      | `string` | Title to update |
| `episode_id`      | `number` | The episode number of this film. |
| `opening_crawl`      | `string` | The opening paragraphs at the beginning of this film. |
| `director`      | `string` |  The name of the director of this film. |
| `producer`      | `string` | The name(s) of the producer(s) of this film. Comma separated. |
| `release_date`      | `string` | The ISO 8601 date format of film release at original creator country. |
| `species`      | `array` | An array of species resource URLs that are in this film. |
| `starships`      | `array` | An array of starship resource URLs that are in this film. |
| `vehicles`      | `array` | An array of vehicle resource URLs that are in this film. |
| `characters`      | `array` | An array of people resource URLs that are in this film. |
| `planets`      | `array` |  An array of planet resource URLs that are in this film. |
| `url`      | `string` | the hypermedia URL of this resource. |
| `created`      | `string` |  the ISO 8601 date format of the time that this resource was created. |
| `edited`      | `string` |  the ISO 8601 date format of the time that this resource was edited. |


#### Delete movie

```http
  DELETE /api/movies
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| `id` | `string` | **Required**. Id of the item to fetch |

## Authors

- [@NickooMar](https://github.com/NickooMar)

