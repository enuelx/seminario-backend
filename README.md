# Backend para TPO de Seminario :rocket:

- [Integrantes](#integrantes)
- [Introducción](#introducción)  
- [Requisitos](#requisitos) 
- [Descargar la aplicación e instalar dependencias](#descargar-la-aplicación-e-instalar-dependencias)
- [Crear archivo de variables de entorno](#crear-archivo-de-variables-de-entorno) 
- [Ejecutar la app](#ejecutar-la-app) 
    * [Por Terminal](#por-terminal) 
    * [Por Docker Compose](#por-docker-compose) 
        * [Start Containers](#start-containers) 
        * [Stop Containers](#stop-containers) 
- [Healthcheck](#healthcheck-backend) 
- [Uso del backend](#uso-del-backend)
    * [Listado de endpoints](#listado-de-endpoints-de-swagger) 

## Integrantes
- Alippi, Juan Ignacio
- Giusti, Juan Manuel
- Guglielmone, Lucas
- Jimenez, Johanna
- Maidana, Emmanuel Carlos Leonel
- Mendieta, Juan Ignacio
- Tomaz, Juan Jose
 
## Introducción

Aplicación de ExplorApp de la materia Seminario de UADE - Turno Miércoles Noche - 2023.

## Requisitos
- [NodeJS](https://nodejs.org/en/download/)
- Poseer una <b>MONGODB_URI</b> válida para comunicarse con la base de datos
- <b>Opcional:</b> [Docker Compose](https://docs.docker.com/compose/install/)

## Backend
Esta app corre el backend, para integrarse con el frontend. A continuación se detalla cómo instalar las dependencias y correr la aplicación.

### Descargar la aplicación e instalar dependencias

```bash
git clone git@github.com:enuelx/seminario-backend.git seminario-backend
cd seminario-backend
npm install
```

### Crear archivo de variables de entorno
```bash
cp .env.example .env
cd ..
```

<b>Agregar los datos que faltan dentro del .env</b>

### Ejecutar la app
#### Por Terminal
```bash
npm start
```

#### Por Docker Compose

##### Start Containers
```bash
docker-compose up --build -d
```
##### Stop Containers

```bash
docker-compose down
```

## Healthcheck Backend
![img]()


## Uso del backend
Ahora el backend está listo para usar.

Se pueden probar los endpoints a través de [Swagger](https://swagger.io/). La misma se encuentra levantada en la ruta "/api-docs", por ejemplo, si el backend se encuentra en el puerto 3000, la ruta es: http://localhost:4000/api-docs

### Listado de endpoints de swagger
![img]()
