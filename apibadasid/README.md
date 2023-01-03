
```sh
$ npx prisma init
```

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

```sh
$ npx prisma db pull # Trae datos de la database a partir de los datos del ficherod e configuración
npx prisma generate
```



https://www.youtube.com/watch?v=RebA5J-rlwg&t=19s