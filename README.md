# Instrucciones #

Se debe crear la carpeta *server/config* y el archivo *server/config/config.json* y en el poner la configuracion para la base de datos

## Para ejecutar el backend se debe navegar hacial la carpeta *server* y ejecutar los siguientes comandos ##

/> npm install

/> npx sequelize-cli db:migrate

/> npx sequelize-cli db:seed:all

/> node app.js

## Para ejecutar el frontend se debe navegar hacial la carpeta *client* y ejecutar los siguientes comandos ##

/> npm install

/> npm start
