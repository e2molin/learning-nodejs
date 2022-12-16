const person = "e2molin";
const express = require("express");
const http = require("http");
const app = express();
const PORT = 3001;

app.use(express.json());

let provincias = [
  {
    "id": 1,
    "nombre": "Álava/Araba",
    "capital": "Vitoria-Gasteiz",
    "autonomia": "Euskadi",
    "codine": "01",
    "fecha": "2022-12-16T15:00:00.999Z",
    "esuniprovincial": false,
  },
  {
    "id": 2,
    "nombre": "Albacete",
    "capital": "Albacete",
    "autonomia": "Castilla La Mancha",
    "codine": "02",
    "fecha": "2022-12-16T16:00:00.999Z",
    "esuniprovincial": false,
  },
  {
    "id": 3,
    "nombre": "Almería",
    "capital": "Almería",
    "autonomia": "Andalucía",
    "codine": "03",
    "fecha": "2022-12-16T17:00:00.999Z",
    "esuniprovincial": false,
  },
];

app.get('/', (request, response) => {
  response.send('<h1>APIBASE OK</h1>')
}); 

app.get('/api/provincias', (request, response) => {
  response.json(provincias);
});

app.get('/api/provincias/:id', (request, response) => {
  const id = Number(request.params.id); //Ojo, los parámetros siempre son strings
  const provincia = provincias.find(provincia => provincia.id === id);
  if (provincia){
    response.json(provincia);
  }else{
    response.status(404).end();
  }
});


app.delete('/api/provincias/:id', (request, response) => {
  const id = Number(request.params.id);
  provincias = provincias.filter(provincia => provincia.id!==id);
  response.status(204).end();
});

app.post('/api/provincias', (request, response) => {
  const provincia = request.body;

  // Validación del nombre
  if (!provincia || !provincia.nombre){
    return response.status(400).json({
        error: "provincia.name is missing"
    });
  }

  // Podemos usar un generador de ids, pero aquí usaremos algo rústico
  const ids = provincias.map(provincia => provincia.id);
  const maxId = Math.max(...ids);

  const newProvincia = {
    id: maxId+1,
    nombre: provincia.nombre,
    capital: provincia.capital,
    autonomia: provincia.autonomia,
    codine: provincia.codine,
    fecha: new Date().toISOString(),
    esuniprovincial: typeof provincia.esuniprovincial !== 'undefined' ? provincia.esuniprovincial : false,
  }
  provincias = [...provincias, newProvincia];
  response.status(201).json(newProvincia); // La respuesta es la nueva nota
});



app.listen(PORT, ()=>{
  // Es más correcto usar esto porque el método listen es asíncrono y puede haber una pequeña latencia.
  console.log(`Server running en puerto ${PORT}`);
});
