## Express

Aquí lo dejo
https://youtu.be/vhUw7GkRHdk?t=2567


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

---



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




