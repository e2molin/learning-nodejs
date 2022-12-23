const {model, Schema}= require("mongoose");

const userSchema = new Schema({
  username:{type:String, required:true, unique:true},
  nombre: String,
  passwordHash:{type:String, required:true},
  profilePic:{type:String, default:""},
  isAdmin:{type:Boolean, default:false},  
  provincias: [{
    type: Schema.Types.ObjectId,
    ref: "Provincia"
  }]
},{
  timestamps: true, // Con esto mongoDb crea automáticamente campos CreateDate and ModifyDate
});

// Modificamos el método toJSON del objeto provinciaSchema, porque es muy complejo y nos basta con simplificarlo
// Además evitamos que por error devolvamos el password.
userSchema.set("toJSON",{
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id;
    delete returnObject._id;
    delete returnObject.__v;
    delete returnObject.passwordHash; // 👀
  }
});

const User = new model("User", userSchema);

module.exports = User;