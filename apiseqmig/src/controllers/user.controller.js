const { User } = require("../models/User.js");


// Devolver todas las gasolineras: por comodidad sólo devolvemos 10
const usersFetcher = async (request, response,next) => {

  try {
    const usersReturned = await User.findAll();
    response.status(200).json(usersReturned);
  } catch (error) {
    next(error);
  };
};

module.exports = {
  usersFetcher
}