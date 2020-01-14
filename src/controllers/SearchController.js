const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(req, res) {
    //Buscar todos os devs no raio de 10km
    //Filtrar por tecnologia

    const { latitude, longitude, techs } = req.query;

    let query = {};
    parseStringAsArray(techs).map(tech => {
      query = { ...query, $regex: new RegExp(`${tech}`, "i") };
    });

    const devs = await Dev.find({
      techs: {
        $elemMatch: query
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });
    return res.json(devs);
  }
};
