const jwt = require("jsonwebtoken");

module.exports = (request, response,next) =>{

  const authorization = request.get("authorization");

  let token = "";
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  let  decodedToken = {};
  try {
    decodedToken = jwt.verify(token, process.env.SECRET_KEY_JWT);  
  } catch (error) {
    //console.log(error);
  }
  
  if (!token || !decodedToken.id){
    return response.status(401).json({
      error: "🔔 token missing or invalid"
    });
  }

  // El userId lo sacamos del token
  const { id: userId } = decodedToken;

  // Express nos permite mutar la request ya añadir la info del userId para crear la provincia
  request.userId = userId;

  next();


};