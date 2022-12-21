## Express

Aquí lo dejo
https://youtu.be/vhUw7GkRHdk?t=2567
https://fullstackopen.com/es/part3/node_js_y_express


Framework para creación de servicios.


https://www.youtube.com/watch?v=o85OkeVtm7k&list=PLV8x_i1fqBw0Kn_fBIZTa3wS_VZAqddX7&index=6



Códigos HTTP y gatos 😺
https://http.cat/

Clientes API Rest

PostMan
https://insomnia.rest/
RapidAPI
Rest Client


Para crear identificadores únicos

npm install uuid

Github Actions podría pasr por un Jenkins en cuanto a funcionalidad.


## Middleware

Con `next()` vamos al siguiente `route` o `use` que hace *matchea* con el *path* que hemos puesto.
Si ponemos `next(error)` vamos al middleware que maneje este error.

Sentry es un gestor de errores. Error tracking
https://www.youtube.com/watch?v=vhUw7GkRHdk&list=PLV8x_i1fqBw0Kn_fBIZTa3wS_VZAqddX7&index=9&t=3767s

---

## testing

Antes se usaba mucho [Mocha](https://mochajs.org) pero ahora se lleva [Jest](https://jestjs.io)



## Snippets


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





## MongoDB

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


Con esta consulta puedeo extraer las provincias y maquetarlas para enviuarlas por POST a MongoDB

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

Se podría convertir en esto, pero ya no hacemos gestión de errores, luego es mejor usar el método con promnesas.

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