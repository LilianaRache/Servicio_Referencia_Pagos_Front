# 💳 Referenced Payments Frontend

Interfaz web desarrollada en Angular para la gestión y consulta de referencias de pago.
Se conecta con la API REST del backend referenced-payments-api para permitir autenticación, creación, consulta y cancelación de pagos.


## 🚀 Requisitos previos

- Asegúrate de tener instalados:
- Node.js (versión 16 o superior)
- Angular CLI (recomendado: npm install -g @angular/cli)
- Docker y Docker Compose (opcional, para entorno contenedorizado).


## 🧩 Instalación y ejecución local

Desde la carpeta raíz del frontend (referenced-payments-frontend):

- 1️⃣ Instalar dependencias
npm install

- 2️⃣ Ejecutar la aplicación en modo desarrollo
ng serve --open

Luego abre en tu navegador:
👉 http://localhost:4200

La aplicación se recargará automáticamente al modificar cualquier archivo fuente.

## 🏗️ Compilación del proyecto

Para generar una versión optimizada para producción:

    npm run build

Los archivos compilados quedarán disponibles en la carpeta dist/.


## 🐳 Ejecución con Docker

Si deseas ejecutar el frontend dentro de un contenedor Docker:

- 1️⃣ Detener y limpiar contenedores previos
docker-compose down -v

- 2️⃣ Construir la imagen desde cero
docker-compose build --no-cache

-  3️⃣ Levantar la aplicación
docker-compose up

Una vez desplegada, la aplicación estará disponible en:
👉 http://localhost:4200


## ⚙️ Variables de entorno

Edita el archivo src/environments/environment.ts (o environment.prod.ts) para ajustar la URL base de la API del backend:

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080'
};


## 👩‍💻 Autor

Desarrollado por Jeimmy Liliana Rache Camargo
💼 Ingeniera de Software | Arquitectura y Desarrollo Full Stack

