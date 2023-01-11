# Configuración y esqueleto de la app con Sequelize-CLI

```sh
$ npm init -y # Inicializamos proyecto
$ npm install express sequelize pg pg-hstore # Install Express - Sequelize
$ npm install sequelize-cli -D # Interfaz Sequelize CLI
$ npm install nodemon -D  # 😈 Demonio de desarrollo
$ npm install dotenv # Instalar dotEnv para el usoia de variables de entorno

$ npx sequelize-cli init # Arrancamos Sequelize CLI

```

Así creamos la estructura del proyecto: config, models, migration y seeders. Movemos a database las carpetas migration y seeders. ;edianmte un fichero .sequelizerc podemos devirle al CLI donde hemos colocado cada carpeta.

```js
// .sequelizerc
const path = require('path');

module.exports = {
  'config': path.resolve('config', 'config.js'),
  'models-path': path.resolve('src', 'models'),
  'seeders-path': path.resolve('database', 'seeders'),
  'migrations-path': path.resolve('database', 'migrations')
};

```

Definimos nuestro fichero con las variables de entorno

```js
DB_USER=
DB_PASSWORD=
DB_DATABASE=datacarto
DB_HOST=localhost
DB_DIALECT=postgres
DB_SCHEMA=cartografia
```

Y nuestro fichero de configuración `config.js` para que acceda a estas variables de entorno. Este fichero puede ser `.json` o `.js`, pero optamos por javascript ya que nos permite introducir código.

```js
require("dotenv").config(); // Así leemos las variables de entorno del fichero .env
module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: process.env.DB_DIALECT,
  define:{
    schema: process.env.DB_SCHEMA || "public",  // Esquema donde se crea la tabla. Si no se pone se hará en public
    underscored: true,                          // Los campos creados por Sequelize usan nombres en snake_case en vez del camelCase
  }
};
```

Podemos generar modelos desde línea de comandos

```sh
$ npx sequelize-cli model:generate --name User --attributes name:string,age:integer
```



