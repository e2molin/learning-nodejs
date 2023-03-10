# 馃摎 Learning Node JS

---

* Paquetes NPM interesantes [馃敆 enlace](./documents/npm-packets.md).
* Configurar un stack de desarrollo para NodeJS + ExpressJS [馃敆 enlace](./documents/config-stack.npm).
* Gesti贸n de varias versiones de **NodeJS** en la misma m谩quina [馃敆 enlace](./documents/nvm-node-multiversion.md).
* Configurando Node - Express - MongoDB [馃敆 enlace](./documents/MEN-config.md).

* Proyecto APIBase con MongoDB y despliegue en **Render** [馃敆 README](./apibase/README.md)
* Proyecto APIBADASID con Prisma ORM [馃敆 README](./apibadasid/README.md)

---

Javascript se crea en 1995 por **Brendan Eich** para *Netscape Navigator* como lenguaje de programaci贸n del lado del cliente. En el lado del servido siempre han dominado mlenguajes como PHP, Python o Java. Su restricci贸n al lado cliente ha hecho que Javascript fuera considerado un lenguaje menor.

El lanzamiento de Firefox en 2002 y Safari 2003 propician la aparici贸n de aplicaciones web con una enorme exigencia en el Javascript del navegador. En 2008 aparece Chrome con el motor V8 de Javascript desarrollado por Lars Bak que multiplicana por 20 el rendimiento del Javascript en ese navegador.

En 2009 **Ryan Dahl** sac贸 el motor V8 de Chrome y lo puso en el servidor, por lo que Javascript pod铆a usarse en el backend. Esto convierte a JS en el lenguaje m谩s usado del mundo.

Node.JS da un paso m谩s, llevando al JS a todas partes, creando un entorno  de ejecuci贸n

* Servidor
* IoT (internet of Things)
* Cloud Computing
* Apps en tiempo real.

Una vez instalado podemos arracar una REPL - *Read Evaluable Print Loop* - para escribir c贸digo, auqneue nosotros vamos directos a nuestro editor.

## 馃摝 Gesti贸n de paquetes

NodeJS viene con un gestor de paquetes llamado NPM. Los paquetes que se utilizan en un proyecto se guardan en un fichero llamado **package.json**.

Se recomienda empear todo proyecto en Javascript ejecutando un

```bash
npm init -y
```

Lo que os generar谩 un **package.json** b谩sico que tomar谩 el nombre del directorio de trabajo

```json
{
  "name": "nombreapp",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Los par谩metros por defecto se pueden preconfigurar para que cuando utilicemos esta opci贸n, se rellenen correctamente.

```bash
npm config set init.author.name "Esteban E. Molin"
npm config set init.author.email "esteban.emolin@gmail.com"
npm config set init.author.url "https://www.develmap.com/cvitae/"
npm config set init.license "MIT"
npm config set init.version "0.0.1"
```

Esta informaci贸n se guardar谩 en un fichero **.npmrc** en nuestro *home*, en mi caso **C:\Users\melena** .

Dentro de este fichero adem谩s se almacenan las dependencias, los paquetes que instalamos y de los que usamos determinadas funciones. Los paquetes se instalan en un directorio llamado *node_modules*, y para instalar un paquete usamos el comando

```bash
npm install <nombre-paquete>    # Se instala dentro de la carpeta node_modules

# Se guardar谩 como dependencia del proyecto. 
# Es el comportamiento por defecto desde NPM5, y ya no hace falta ponerlo
npm install axios --save        

npm install -g <nombre-paquete> # Se instala a nivel global en el equipo. Reservarlos para los CLI

npm install <package name>@1.2.3 # As铆 instalamos una versi贸n en particular de un paquete
```

La opci贸n *global* se utiliza  para los CLI de Vue, React o APICNIG, o para paquetes frecuentes como **nodemon**. En mi equipo los paquetes globales se instalan en la carpeta 

```bash
# Cuando se actualiza NodeJS , a veces es comveniente borrarlas a mano.
C:\Users\melena\AppData\Roaming\npm\node_modules # 馃摝 Paquetes globales
C:\Users\melena\AppData\Roaming\npm-cache        # Directorio de cache
```

En cualquier caso podemos obtener la ruta donde se instalan los paquetes globales as铆

```bash
npm config get prefix
```

Podemos tambi茅n ver los paquetes globales instalados, as铆

```bash
npm list -g             # Muestra paquetes principales y sus dependencias
npm list -g --depth 0   # Muestra solo los paquetes principales
```
### 馃數 Otros comandos interesantes son

```bash
npm doctor                          # Comprueba que la instalaci贸n est茅 correcta
npm uninstall -g <nombre-paquete>   # Desinstala un paquete global
npm outdated                        # Lista m贸dulos no actualizados
npm up <nombre-paquete>             # Actualizamos el paquete a una versi贸n m谩s reciente
```


Dentro de c贸digo de buenas maneras, cuando se suben los ficheros de un proyecto a GitHub, no se sube la carpeta **node_modules**. Esto nos obliga a que cuando se recupera o se clona un proyecto, se ejecute un 

```bash
npm update # Lee el package.json y se baja los paquetes especificados en las dependencias.
```

### 馃敻 Instalar/desinstalar versiones

Puede suceder que necesitemos desinstalar un paquete que hayamos a帽adido a nuestrop proyecto, simplemente porque necesitemso hacer un *downgrade*.

```sh
$ npm uninstall mongoose # Desinstalamos el paquete actual de mongoose
$ npm install mongoose@5.11.15 # instalamos una versi贸n del paquete en concreto
```


### 馃敻 Las dependencias y sus versiones. Versionamiento sem谩ntico (semver)

Como vemos lo paquetes tienen su versi贸n 馃憠 a.b.c donde:

* a - *Major* (Mayor): Los cambios introducidos son grandes. El c贸digo nuevo puede hacer que nuestra App no funcione.
* b - *Minor* (Menor): Se agregan nuevas caracter铆sticas, pero el c贸digo sigue siendo retrocompatible.
* c - *Patch* (Parches): Son conocidos tambi茅n como bug fixes.

Podemos especificar que se instale una determinada versi贸n. La versi贸n  de eslint 6 se agrega as铆 a nuestro proyecto.

```bash
npm i eslint@6.0.0 --save-dev # As铆 instalamos una en particular
npm i eslint -E # As铆 instalamos la 煤ltima y especifica en el package.json que siempre debe instalar esa, no una superior.
```

Respecto a c贸mo se codifican las versiones de los paquetes **NPM** en nuestro `package.json.`.

* **~version** *鈥淢谩s o menos equivalente a la versi贸n鈥?*, actualizar谩 a las futuras nuevas versiones, sin incrementar la versi贸n *minor*: **~1.2.3** actualizar谩 versiones desde la 1.2.3 a <1.3.0. El s铆mbolo `~` se llama *virgulilla*.
* **^version** *鈥淐ompatible con la versi贸n鈥?*, actualizar谩 a todas las futuras versiones *minor/patch*, sin incrementar la versi贸n *major*. **^2.3.4** actualizar谩 versiones desde 2.3.4 a <3.0.0. El s铆mbolo `^` se llama *caret*.


Hay un plugin de VSCode llamado **Version Lens** que te indica en un `package.json` si es o no la 煤ltima.

### 馃數 Dependencias del desarrollo

Existen otro tipo de dependencias que solo son necesarias cuando se desarrolla, pero no son dependencias de nuestra aplicaci贸n. Estas dependencias de desarrollo se les llama *development dependencies*. No son necesarios para que su m贸dulo o aplicaci贸n funcionen en producci贸n, pero pueden ser 煤tiles al escribir el c贸digo.

Una muy t铆pica es [nodemon](https://nodemon.io/), un demonio para detectar cambios en nuestro c贸digo y rearrancar todo. Aunque desde su erb nos aconseja instalarlo global, es mejor hacerlo como dependencia de desarrollo porque as铆 figura en nuestro package.json.


```sh
# Podemos hacerlo de cualquiera de las dos maneras 馃憞
$ npm install nodemon --save-dev # Opci贸n 1
$ npm install nodemon -D # Opci贸n 2
```

Dentro del package.json, estas dependencias tienen su lugar particular

```json
{
  // ...
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
```

Para ejecutar nodemon desde la linea de comandos, escribir铆amos

```sh
$ ./node_modules/.bin/nodemon index.js
```

Pero cuando creamos el script del `package.json`, basta con escribir el comando `nodemon index.js` porque los scripts definidos miran por defecto al carpeta  `./node_modules/.bin/`. El script quer铆a as铆:

```json
  "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

### 馃敼 Usando variables de entorno - Fichero .env

Instalamos [dotenv](https://www.npmjs.com/package/dotenv) que es un paquete de *zero-dependency* que permite cargar variables de entorno a trav茅s de un fichero `.env`. LA instalci贸n es

```sh
$ npm install dotenv
```

Para usarlas, desde nuestro `index.js`

```js
require('dotenv').config();
```

```
API_PORT = 3001
MONGO_DB_URI = mongodb+srv://[usuario]:[password]@cluster0.jiudpvd.mongodb.net/[badasid]?retryWrites=true&w=majority
```

### 馃敼 Definiendo nuestro *code style* - Linters

El *code linter* m谩s extendido es EsLint. Los desarrolladores utilicen linters de c贸digo para asegurarse de que su c贸digo siga las pr谩cticas recomendadas y mantener un estilo uniforme. Si bien esto es 煤til para el desarrollo, solo aumenta el tama帽o del c贸digo que puede distribuirse y no proporciona un beneficio tangible cuando se implementa en producci贸n. Por esllo lo instalamos como desarrollo.

```sh
# Instalamos dependencia de desarrollo
$ npm install eslint -D
# Inicializamos el eslint
$ npx eslint --init         # Opci贸n de configuraci贸n 1
$ npm init @eslint/config   # Opci贸n de configuraci贸n 2
```

Esto genera un fichero `.eslintrc.js` con nuestra configuraci贸n, a la que podemos a帽adir, quitar o modificar reglas. Por ejemplo, la variable `process` aunque no est茅 definida est谩 disponible en NodeJS. Para que no nos marque como error su uso:

```json
	"env": {
		"browser": true,
		"commonjs": true,
		"es2021": true,
		"node": true, /* 馃憟 A帽adimos esta l铆nea para indicar a eslint que estamos con NodeJS */
	},
```

Despu茅s de instalar todo, podemos ver y configurar nuestro *linter* de c贸digo con el fichero de configuraci贸n `.eslintrc.cjs`. Podemos analizar un fichero as铆:

```bash
npx eslint ./src/main.jsx # Nos devolver谩 por pantalla una lista de errores
npx eslint ./src/main.jsx --fix # Nos permitir谩 arreglar los errores autom谩ticos
```

Las extensiones **Eslint** o **Error Lens** de **VSCode** nos ayudan a trabajar con este *linter*. Es mejor usar una **Gu铆a popular de errores**. Yo uso 馃憤 la **Standard** y desaconsejo 馃憥 la de AirBnB. De hecho, podemos instalar el *linter* de **standard**, que se basa en **esLint**, sin tener que instalar el propio **esLint**.

#### 馃敼 Usando el *linter* **standard**

La instalaci贸n es as铆:

```sh
npm install standard -D
```

Y en el fichero de configuraci贸n del `package.json`, a帽adimos:

```json
  "eslintConfig": {
    "extends": "./node_modules/standard/eslintrc.json"
  }
```

Podremos agregar reglas para redefinir el comportamiento de esLint en el fivchero de configuraci贸n. [Aqu铆 tenemos un ejemplo](https://eslint.org/docs/latest/rules/no-console) de c贸mo permitir que haya llamadas a la consola en c贸digo.


### 馃數 Errores

Cuando ejecutamos un comando install, en ocasiones se producen errores. Uno de los m谩s comunes es

> npm WARN deprecated

Son errores que avisan que una de las dependencias del paquete que instalamos est谩 marcada como obsoleta. El desarrollador del paquete deber铆a eliminarla y utilizar otra para el mismo fin. Tambi茅n nos encontramos con

> npm WARN notsup

Estos errores suelen aparecer cuando tenemos una versi贸n de **node** o **npm** que no soporta alguna de las dependencias del paquete o simplemente estamos usando un sistema operativo donde no es necesaria. Por 煤ltimo destacamos los erreos de permisos.

> npm WARN checkPermissions

Error de permisos. Es bastante frecuente tener este problema y normalmente es debido a que se ha utilizado sudo para instalar paquetes con NPM, algo que nunca se deber铆a hacer. **NUNCA** utilices **sudo** con npm (ni lo ejecutes como root). De lo contrario, es muy probable que termines teniendo estos problemas de permisos.

## 鉀诧笍 Art铆culos

* Curso de Node [馃幀 video](https://www.youtube.com/watch?v=mG4U9t5nWG8&list=PLPl81lqbj-4IEnmCXEJeEXPepr8gWtsl6&index=1).
* Apuntes de node [馃敆 enlace](https://apuntes.de/nodejs/#gsc.tab=0).
* Bootcamp Fullstack MiduDev. V铆deos 6 -15. [馃幀 Lista completa de v铆deos](https://www.youtube.com/playlist?list=PLV8x_i1fqBw0Kn_fBIZTa3wS_VZAqddX7).

## 馃О锔? Recursos interesantes

### Clientes de API REST

* **PostMan** - Necesita instalador. [馃敆 Enlace](https://www.postman.com/)
* **Insomnia** - Necesita instalador. Recomendada por [馃悪 rruiztorres](https://github.com/rruiztorres) [馃敆 Enlace](https://insomnia.rest/)
* **RapidAPI** - Extensi贸n de VSCode.
* **Thunder Client** - Extensi贸n de VSCode.
* **Rest Client** - Extensi贸n de VSCode. PAra m铆 la m谩s sencilla, con ficheros `.rest`.


## 鈴? Pending desarrollo

### API PostgreSQL

* 馃敆 https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/
* 馃敆 https://www.youtube.com/watch?v=VDgXAw7VynQ
* 馃敆 https://medium.com/bb-tutorials-and-thoughts/how-to-build-nodejs-rest-api-with-express-and-postgresql-674d96d5cb8f
* 馃敆 https://www.youtube.com/watch?v=7NfvC-gOcRc
* https://www.digitalocean.com/community/tags/node-js?subtype=tutorial
* https://www.toptal.com/javascript/a-guide-to-npm-the-node-package-manager