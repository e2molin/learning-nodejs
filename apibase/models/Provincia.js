const {model, Schema}= require("mongoose");

const provinciaSchema = new Schema({
  provincia_id: {
    type     : Number,
    required : true,
    unique   : true,
    validate : {
      validator : Number.isInteger,
      message   : "{VALUE} is not an integer value"
    }
  },
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

//Modificamos el método toJSON del objeto provinciaSchema, porque es muy complejo y nos basta con simplificarlo
provinciaSchema.set("toJSON",{
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id;
    delete returnObject._id;
    delete returnObject.__v;
  }
});


const Provincia = new model("Provincia", provinciaSchema);

module.exports = Provincia;
