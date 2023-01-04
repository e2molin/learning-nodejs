# APIDATABASE con Prisma ORM

## PERN Stack con Prisma

PERN son las siglas de **P**ostgreSQL, **E**xpress, **R**eact y **N**ode.js para identificar los desarrollos cliente servidor utilizando estas tecnologías. Este proyecto además utiliza como **ORM** Prisma.

* React, Node y PostgreSQL (PERN Stack) con Material UI [🎬 vídeo](https://www.youtube.com/watch?v=_zGL_MU29zs)  [👨‍💻 programmer](https://github.com/FaztWeb)
* API PostgreSQL con Sequelize [🎬 vídeo](https://www.youtube.com/watch?v=3xiIOgYdbiE) [code](https://github.com/FaztWeb/nodejs-sequelize-restapi-postgres) [👨‍💻 programmer](https://github.com/FaztWeb)
* PERN Stack Todo List App - Step-By-Step Tutorial. Usa **Chakra-UI** y **TypeScript** [🎬 vídeo](https://www.youtube.com/watch?v=sQBA0sq9G0A)
* PERN Stack Course - Postgres, Express, React, and Node. Usa **PG** para conectarse a PostgreSQL [🎬 vídeo](https://www.youtube.com/watch?v=ldYcgPKEZC8)
* PERN - JWT Tutorial [🎹 code](https://github.com/ousecTic/pern-jwt-tutorial) [👨‍💻 programmer](https://github.com/ousecTic)


## ORM

**O**bject-**R**elational **M**apper o «Mapeador». Es un modelo de programación que permite mapear las estructuras de una base de datos relacional (SQL Server, Oracle, MySQL, etc.), en adelante RDBMS (Relational Database Management System), sobre una estructura lógica de entidades con el objeto de simplificar y acelerar el desarrollo de nuestras aplicaciones. de relacional a objetos (y viceversa). 

Otro punto importante es la facilidad de trabajo, un ORM, nos facilita las labores básicas de cualquier acceso a datos , el CRUD (**C**reate, **R**ead, **U**pdate y **D**elete).

En este proyecto usaremos [Prisma](https://www.prisma.io/) como ORM de acceso a datos. [Este vídeo 🎬](https://youtu.be/gnW85X1JlCo) y este [otro video 🎬](https://youtu.be/RebA5J-rlwg)  nos ayudan a entender los conceptos generales. 

## Prisma ORM

Prisma es un conector de base de datos **GraphQL** en tiempo real que convierte la base de datos en un API **GraphQL**, podemos verlo como una especie de ORM, pero es mucho más poderoso que los ORM tradicionales.

Con Prisma, obtenemos un servidor (servidor Prisma) que actúa como un proxy para nuestra base de datos y un motor de consultas de alto rendimiento que se ejecuta en el servidor, lo que genera consultas de bases de datos reales para nosotros.

El API GraphQL de prisma proporciona abstracciones para desarrollar backends GraphQL flexibles y escalables.

Prisma nos genera un cliente (cliente Prisma), que podemos usar para interactuar con el servidor. Prisma también agrega un sistema de eventos en tiempo real a nuestra base de datos, para que podamos suscribirnos a los eventos de la base de datos en tiempo real.

Es interesante instalar [el plugin de VSCode para Prisma](https://github.com/prisma/language-tools) que nos permite añadir color a la sintaxis de los ficheros `.prisma`.

```sh
# Instalación de Prisma, una parte de desarrollo y otra de producción
$ npm install prisma -D
$ npm install @prisma/client

# Una vez instalado inicializamos prisma
$ npx prisma init --datasource-provider postgresql
```

Esta operación nos crea un directorio llamado `prisma` con un fichero de configuración. También crea si no existe un fichero `.env` para definir la conexión a la database.

> `DATABASE_URL="postgresql://e2molin:.s3cr3t0@localhost:5432/datacarto?schema=cartografia"`  Trabajará en el esquema cartografia
> `DATABASE_URL="postgresql://e2molin:.s3cr3t0@localhost:5432/datacarto"` Trabajará en el esquema por defecto, public

Nosotros trabajamos con la segunda opción, y la configuración multischema. Para ello añadimos algunos parámetros más en el fichero `schema.prisma`.

```js
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["multiSchema"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  schemas  = ["cartografia", "public"]
}
```

Prisma funciona con bases de datos existente o *schema first*. El primer caso es con el que trabajamos ahora: vamos generar los modelos a partir de esta base de datos que ya existe.

```sh
$ npx prisma db pull # Trae datos de la database a partir de los datos del fichero de configuración
```

En el fichero `schema.prisma` aparecerá el modelo de nuestra tabla

```js
model gasolineras {
  id                     Int     @id @default(autoincrement())
  ideess                 Int?
  rotulo                 String? @db.VarChar
  horario                String? @db.VarChar
  municipio              String? @db.VarChar
  provincia              String? @db.VarChar
  lat                    Float?
  lon                    Float?
  gasoleo_a              Float?
  gasolina_95_e5         Float?
  
  @@schema("cartografia")
}
```

Seguidamente generamos el cliente para consultar este modelo.

```sh
$ npx prisma generate
```

---

La otra opción de trabajo de Prisma es mediante una database *schema first*. En este caso partimos de un modelo definido en sintaxis graphQL y a partir del modelo creamos la base de datos. En ese caso obviamente no podemos usar el comando `npx prisma db pull`. Ahora crearíamos el modelo dentro de `schema.prisma`.

```js
model user{
  id Int @id @default(autoincrement())
  name String?
  email String
  products product[] // Esto significa que un usuario puede tener varios productos.
}

model product{
  id Int @id @default(autoincrement())
  name String?
  price Float
  quantity Int
  seller user @relation(fields:[sellerId], references:[id]) // Así enlazamos producto y vendedor.
  sellerId Int
}
```

Otra definición de modelo más compleja e interesante sería:

```js
model User {
  id                String  @id @default(uuid())
  age               Int
  name              String
  email             String  @unique
  role              Role    @default(BASIC)
  isAdmin           Boolean
  preferences       Json
  writtenPosts      Post[] @relation ("WrittenPosts")
  favoritePosts     Post[] @relation("FavoritePosts")
  userPreference    UserPreference? @relation(fields:[userpreferenceId], references:[id])
  userPreferenceId  String? @unique

  @@unique([age,name])
  @@index([name])
}

model UserPreference {
  id            String @id @default(uuid())  
  emailUpdates  Boolean
  user          User?
}

model Post {
  id            String @id @default (uuid())
  title         String
  avgRating     Float
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updateAt
  author        User @relation ("WrittenPosts", fields: [authorId], references: [id])
  authorId      String
  favoritedBy   User? @relation ("FavoritePosts", fields: [favoritedById], references: [id])
  favoritedById String?
  categories    Category[]

}

model Category {
  id            String @id @default (uuid())
  name          String @unique
  posts         Post[]
}

enum Role {
  BASIC
  EDITOR
  ADMIN
}
```

Ahora podemos generar las SQL que crearán esta estructura en la database usando `npx prisma migrate dev --name inicialSQL`. A continuación podemos ir añadiendo o quitando campos o tablas, de manera que añadiremos nuevos ficheros de migración, cada uno tiene un nombre. De esa manera se conservan los datos existentes. Sería una manera de hacer un `ALTER TABLE`. Ojo 👀❗️, los SQLs se ejecutan cuando se lanza este comando. Los ficheros SQL se almacenan en una carpeta llamada `migrations`, dentro de la carpeta `prisma`. Después de cada migraciónm, hay que ejecutar de nuevo el comando `npx prisma generate` para que se regenere el cliente y esté preparado para usarlo en nuestro código.

Según el modelo anterior, para que me devueklva las dos tablas enlazadas, necesitaríamos algo como

```js
app.get("/products", async (request, response) => {
  const products = await prisma.product.findMany({
    include:{
      seller: {
        select: {
          name: true,
          email: true,
        }
      }
    },
  });
  response.status(200).json(products);
});

app.get("/users", async (request, response) => {
  const users = await prisma.product.findMany({
    select: {
      name: true,
      email: true,
      products: true,
    }
  });
  response.status(200).json(users);
});
```

Otra herramienta 📐 de utiliza de prisma es su cliente UI. Lanza un cliente de la database en el puerto 5555.

```sh
$ npx prisma studio
```

### Carga de datos en masa

Podemos montar un pewqueño script para cargar en la base de datos muchos registros de una tacada, ejecutando con `node carga.js`.

```js
// fichero carga.js
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
async function bulkData() {
  //Crear un registro
  const post = await prisma.post.createMany ({
    data: [
    { title: 'Título 2', content: 'Este es mi segundo post'},
    { title: 'Título 3', content: 'Este es mi tercer post'},
    { title: 'Título 4', content: 'Este es mi cuarto post'},
    ]
});

// Lanzamos el script
bulkData()
  .catch((e)=>{
    throw e
  })
  .finally(async()=>{
    await prisma.$disconnect()
  })

```



### Prisma con base de datos locales.

Podemos trabajar con una base de datos desplegado en el propio servidor de Node, con un sqlLite. Por ejemplo

```js
generator client {
  provider        = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

Y el fichero .env sería

```js
DATABASE_URL="file:./data.db"
```

## Fuentes

* APIREST CRUD con Prisma ORM y database en sqlite [🎬 vídeo](https://www.youtube.com/watch?v=HCJmlvgO2WY)
* Desplegar un servidor **GraphQL** con Prisma [🔗 enlace](https://www.nocountryforgeeks.com/segunda-parte-contruye-un-server-graphql-con-prisma/)
