
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
## Getting Started

Guía de instalación del proyecto.

Listado de paquetes necesarios para correr el proyecto.

- npm

```bash
  npm install npm@latest -g
```

## Installation

Clonar el repositorio completo.
```bash
git clone https://github.com/NickooMar/conexa_test.git
```

Setear las variables de entorno con valores locales - (Las variables se encuentran en los archivos `.env.example` de cada servicio).

### MongoDB
Es necesario tener MongoDB instalado y en funcionamiento. Este proyecto requiere de 2 (dos) colecciones en la base de datos

`movies`: Para almacenar la información de las películas.

`users`: Para almacenar la información de los usuarios registrados.

### API - Gateway

1. Ingresar en la carpeta.
```bash 
cd api-gateway
```
2. Crear un archivo `.env` en la raiz de la carpeta `api-gateway` .
2. Configurar las variables de entorno en el archivo previamente creado en base a `.env.example`.
2. Instalar los modulos necesarios.
```bash
npm install
```
3. Ejecutar el servicio
```bash
npm run start:dev
```
4. Finalmente el servicio estará en funcionamiento

### Auth Service

1. Ingresar en la carpeta.
```bash 
cd auth-service
```
2. Crear un archivo `.env` en la raiz de la carpeta `auth-service` .
2. Configurar las variables de entorno en el archivo previamente creado en base a `.env.example`.
2. Instalar los modulos necesarios.
```bash
npm install
```
3. Ejecutar el servicio
```bash
npm run start:dev
```


### Client Backend

1. Ingresar en la carpeta.
```bash 
cd client-backend
```
2. Crear un archivo `.env` en la raiz de la carpeta `client-backend` .
2. Configurar las variables de entorno en el archivo previamente creado en base a `.env.example`.
2. Instalar los modulos necesarios.
```bash
npm install
```
3. Ejecutar el servicio
```bash
npm run start:dev
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


## Recursos utilizados

[Nestjs](https://nestjs.com/)

[SWAPI](https://swapi.dev/documentation)

[Mongo Compass](https://www.mongodb.com/products/tools/compass)
