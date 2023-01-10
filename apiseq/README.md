# APISEQ

```sh
npm install express morgan sequelize pg pg-hstore
```

En el package.json definimos la prop ` "type": "module",`  que nos permite usar módulos de Emacscrit

https://sequelize.org/docs/v6/category/core-concepts/


### Relaciones
```js
//one-to-one => hasOne, belongsTo
User.hasOne(ContactInfo,{
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
  }
});
ContactInfo.belongsTo(User);

//one-to-many => hasMany, belongsTo
User.hasMany(Tweet,{
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
  }
});
Tweet.belongsTo(User);

//many-to-many => belongsToMany con dos tablas involucradas
Actor.belongsToMany(Movie, {through: "Actors_Movies"});
Movie.belongsToMany(Actor, {through: "Actors_Movies"});

//many-to-many => belongsToMany con una misma tabla
User.belongsToMany(User, {as:"User", foreignKey: "UserId", through: "Follow"});
User.belongsToMany(User, {as:"Followed", foreignKey: "FolowedId", through: "Follow"});
```

### Otros objetos Sequelize

* Transacciones
* Hooks
* Eager Loading
* PostGIS datatypes

## ⛲️ Referencias y fuentes

* Sequelize REST API (usando Postgres) [Vídeo](https://www.youtube.com/watch?v=3xiIOgYdbiE)
* List Postgres & Sequelize [Vídeo](https://www.youtube.com/playlist?list=PLrwNNiB6YOA04IdB4Oo4faikZ8xzOHj7q)

### ⏳ Pending

* Crear Página FULL STACK con REACT, REDUX, SEQUELIZE, EXPRESS y POSTGRESQL [Vídeo](https://www.youtube.com/watch?v=z3xtHiDYyLU)
* https://www.youtube.com/watch?v=1_6sYPCxRSI y  https://github.com/antonrodin/sequelize
* https://www.youtube.com/playlist?list=PLn9Y084aviLmTy5TO6sw6Ky6NjEO5uCme