# APIBASE

API en NodeJS con **Express** y **Mongoose** para acceder a MongoDB.
Hospedada en Render [https://dvm-apibase.onrender.com/](https://dvm-apibase.onrender.com/).
Middlewares, JWT, encriptación de contraseñas.

---

* Node.js y Express en [🔗 Full Stack open 2022](https://fullstackopen.com/es/part3/node_js_y_express).
* Curso MiduDev de [🔗 Bootcamp Fullstack](https://www.youtube.com/playlist?list=PLV8x_i1fqBw0Kn_fBIZTa3wS_VZAqddX7)

---

## Express y Mongoose para acceder a Mongo DB

https://youtu.be/vhUw7GkRHdk

## Middleware

Los middleware son funciones / métodos / procedimientos que se invocan entre el request y el response de la llamada a la API.

Con `next()` vamos al siguiente `route` o `use` que hace *matchea* con el *path* que hemos puesto.
Si ponemos `next(error)` vamos al middleware que maneje este error.

Sentry es un gestor de errores. Error tracking
https://www.youtube.com/watch?v=vhUw7GkRHdk&list=PLV8x_i1fqBw0Kn_fBIZTa3wS_VZAqddX7&index=9&t=3767s

---

## Testing

Antes se usaba mucho [Mocha](https://mochajs.org) pero ahora se lleva [Jest](https://jestjs.io)

Cuando arrancamos los script del `package.json`, es importante definir en qué entorno de trabajo estamos, en *development* o en *production*. Por ejemplo, si estamos en *development*, pueden hacerse unos determinados tests distintos de los que hacemos si estamos en *production*. La forma de definir esto es mediante una variable de entorno:

```json
  "scripts": {
    "dev_linux": "NODE_ENV=development nodemon index.js", /* Así se especifica en Unix */
    "dev_windows": "set NODE_ENV=development& nodemon index.js", /* Así se especifica en Windows */
    "start": "node index.js",
    "test": "jest --verbose"
  },
```

Pero hay una manera más cómoda de establecer variables de entorno y es usar la dependencia de desarrollo **cross-env**.

```sh
$ npm install cross-env -D
```

En este caso reescribimos los scripts así:

```json
  "scripts": {
    "dev": "cross-env NODE_ENV=development nodemon index.js",
    "start": "cross-env NODE_ENV=production node index.js",
    "test": "cross-env NODE_ENV=development jest --verbose"
  },
```

Añadimos además un nuevo script, para que haga los test de los ficheros que cambian cada vez que guardamos

```json
  "scripts": {
    "dev": "cross-env NODE_ENV=development nodemon index.js",
    "start": "cross-env NODE_ENV=production node index.js",
    "test": "cross-env NODE_ENV=development jest --verbose",
    /* Lo del guón guión -- en medio, es para que entienda que los paramétros son para el comandotest, no para el npm */
    "test:watch": "npm run test  -- --watch",
    /* Así limpiamos 🧹️ la caché del Jest de los sucesivos tests */
    "test:clear": "cross-env NODE_ENV=test jest --clearCache",
    /* Así pasamos exclusivamente el 🧪️ test de provincias */
    "test:provincias": "cross-env NODE_ENV=test jest --verbose --silent tests/provincias.test.js",
    /* Así pasamos exclusivamente el proceso de test por un puerto específico ⚓️ evitando colisiones */
    "test:users": "cross-env NODE_ENV=test  PORT=1234 jest --verbose --silent tests/users.test.js"
  },

```

Los test pueden ser unitarios, de una función en particular, o test de integración, que comprueban una funcionalidad completa. El paquete supertest es un paquete de desarrollo que nos permite envolver nuestra app de backend para realizar test.

Para testear los endpoints de una API usamos 
```sh
$ npm install supertest -D
```

[Ejemplo de supertest](./src/../tests/provincias.test.js)

Cuando ejecutamos los test por consola, sale mucho ruido. Vamos a programas los test para que la salida sea más limpia.

> `"test": "cross-env NODE_ENV=development jest --verbose --silent"`

## 🧩️ Snippets


```js
  // Podemos usar un generador de ids, pero aquí usaremos algo rústico
  const ids = provincias.map(provincia => provincia.id);
  const maxId = Math.max(...ids);

  const newProvincia = {
    id: maxId + 1,
    nombre: provincia.nombre,
    capital: provincia.capital,
    autonomia: provincia.autonomia,
    codine: provincia.codine,
    fecha: new Date().toISOString(),
    esuniprovincial: typeof provincia.esuniprovincial !== "undefined" ? provincia.esuniprovincial : false,
  };
  provincias = [...provincias, newProvincia];
```

### Deconstrucción

Esto es equivalente

```js
const id = request.params.id;
const {id} = request.params;
```


## MongoDB y Mongoose

Acceso a Atlas **MongoDb** con: https://www.mongodb.com/home myemail:🛵

Para crear identificadores únicos

```sh
$ npm install uuid
```

Github Actions podría pasr por un Jenkins en cuanto a funcionalidad.

Mongoose es una librería para Node. js que nos permite escribir consultas para una base de datos de MongooDB, con características como validaciones, construcción de queries, middlewares, conversión de tipos y algunas otras, que enriquecen la funcionalidad de la base de datos. Instalamos [mongoose](https://mongoosejs.com/)

```sh
$ npm install mongoose
``` 

Creando esquemas, modelos e instancias

```js

// Creamos el esquema
const provinciaSchema = new Schema({
  provincia_id: Number,
  nombre: String,
  capital: String,
  autonomia: String,
  fecha: Date,
  codine: String,
  esuniprovincial:Boolean,
  dirrepo: String,
  histo: String,
  comautonoma_id: Number,
  matricula: String,
  cdu:String
});

// Creamos el modelo para poder crear instancias a este esquema. En singular
const Provincia= new model("Provincia", provinciaSchema);
const provincia = new Provincia({
  provincia_id: 1,
  nombre: "Álava/Araba",
  capital: "Vitoria-Gasteiz",
  autonomia: "Euskadi",
  fecha: new Date(),
  codine: "01",
  esuniprovincial: false,
  dirrepo: "ALAVA",
  histo: "Álava; Guipúzcoa; Vizcaya; Álava-Guipúzcoa-Vizcaya",
  comautonoma_id: 16,
  matricula: "VI",
  cdu: "460.156"
});

provincia.save()
  .then((result)=>{
    console.error("🥂 Nuevo registro");
    console.log(result);
  }).catch((err)=>{
    console.error(err);
  }).finally(()=>{
    mongoose.connection.close();
    console.log("🔒 Connection closed connected");
  });
```


Con esta consulta puedeo extraer las provincias y maquetarlas para enviuarlas por POST a MongoDB.

```sql
SELECT
    json_build_object(
        'provincia_id', prov.idprovincia,
        'nombre', prov.nombreprovincia,
		    'capital', prov.capitalprovincia,
		'autonomia', com.nombre_comunidad,
		'codine', to_char(idprovincia, 'FM09'::text),
		'esuniprovincial', com.esuniprovincial,
		'dirrepo', prov.dirrepo,
		'histo', prov.histo,
		'comautonoma_id', prov.comautonoma_id,
		'matricula', prov.codigo,
		'cdu', prov.cdu
	)
FROM bdsidschema.provincias prov inner join bdsidschema.comunidades com on prov.comautonoma_id=com.idcomunidad where prov.idprovincia=6
```

Por qué usamos promesas y no async await

El método

```js
// Dar de alta Provincia
app.post("/api/provincias", (request, response) => {
  const provincia = request.body;

  // Validación del nombre
  if (!provincia || !provincia.nombre) {
    return response.status(400).json({
      error: "provincia.name is missing"
    });
  }

  const newProvincia = new Provincia ({
    provincia_id: Number(provincia.provincia_id),
    nombre: provincia.nombre,
    capital: provincia.capital,
    autonomia: provincia.autonomia,
    fecha: new Date().toISOString(),
    codine: provincia.codine,
    esuniprovincial: typeof provincia.esuniprovincial !== "undefined" ? provincia.esuniprovincial : false,
    dirrepo: provincia.dirrepo,
    histo: provincia.histo,
    comautonoma_id: Number(provincia.comautonoma_id),
    matricula: provincia.matricula,
    cdu: provincia.cdu
  });

  newProvincia.save().then((savedProvincia)=>{
    response.status(201).json(savedProvincia);
  }).catch((err)=>{
    console.log(`⚙️ Ruta no controlada ${err}`);
    response.status(400).json({
      error: err
    });
  });
});

```

Se podría convertir en esto, pero ya no hacemos gestión de errores, luego es mejor usar el método con promesas.

```js
// Dar de alta Provincia
app.post("/api/provincias", await (request, response) => {
  const provincia = request.body;

  // Validación del nombre
  if (!provincia || !provincia.nombre) {
    return response.status(400).json({
      error: "provincia.name is missing"
    });
  }

  const newProvincia = new Provincia ({
    provincia_id: Number(provincia.provincia_id),
    nombre: provincia.nombre,
    capital: provincia.capital,
    autonomia: provincia.autonomia,
    fecha: new Date().toISOString(),
    codine: provincia.codine,
    esuniprovincial: typeof provincia.esuniprovincial !== "undefined" ? provincia.esuniprovincial : false,
    dirrepo: provincia.dirrepo,
    histo: provincia.histo,
    comautonoma_id: Number(provincia.comautonoma_id),
    matricula: provincia.matricula,
    cdu: provincia.cdu
  });

  const savedProvincia = await newProvincia.save()
  response.json(savedProvincia);

});
```

## 🔐 Inicio de sesión de usuarios con JSON Web Tokens

[🎬 Video](https://youtu.be/btW1SefZf9M)

Hay varias librerías, nosotros usamos **JWT** [🔗 Enlace](https://jwt.io/)

```sh
$ npm install jsonwebtoken
```

Teoría sobre los patrones de autenticación. Usaremos Bearer [🔗 Enlace](https://developer.mozilla.org/es/docs/Web/HTTP/Authentication#esquemas_de_autenticaci%C3%B3n)

## 🛂 Encriptación de contraseñas

[🎬 Video](https://youtu.be/bARan2RAt5w)

Codificación de contraseñas con la librería **bcrypt** [🔗 Enlace](https://github.com/kelektiv/node.bcrypt.js/)

```sh
$ npm install bcrypt
```

## 🚀 Deploy 

Para desplegar nuestra API tenemos varias soluciones. **Heroku** es una plataforma como servicio (PaaS) de computación en la Nube que soporta distintos lenguajes de programación. Hasta hace unos años, Heroku era la opción más utilizada, pero la falta de nuevas funcionalidades, el tiempo de levantar las instacias y cómo las congela de repente, así como varios problemas de seguridad, les ha hecho perder muchos enteros. A fecha de diciembre de 2022, las mejores opciones actualmente para hospedar un servicio API son:

### 🔹 Render

Para  desplegar una API con Node utilizando Express, [Render](https://render.com/docs/deploy-node-express-app). 

* Creamos un repositorio con nuestro desarrollo.
* Desde **Render** nos conectamos parametrizando el repositorio de Github y la rama que queremos desplegar.
* Definimos el nombre con el que se va a distribuir nuestro servicio `dvm-apibase`.
* **Root Directory** en nuestro caso `apibase`, ya que cuelga del repo `learning-nodejs`.
* **Build command** es `npm install`.
* **Start Command** es `node index.js`.

Luego tenemos que definir nuestras variables de entorno, con las configuraciones de acceso a la base de datos. Para ello usamos la opción de **Secret Files**, en donde creamos un fichero `.env` con el contenido de nuestro fichero local.

Una vez terminado, veremos cómo se arranca nuestro servicio. Disponible en [https://dvm-apibase.onrender.com/](https://dvm-apibase.onrender.com/).

### 🔹 Railway




## ⛲️ Recursos

* Códigos HTTP y gatos 😺 [https://http.cat/](https://http.cat/)

