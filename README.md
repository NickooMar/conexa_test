
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
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.


## Authors

- [@NickooMar](https://github.com/NickooMar)

