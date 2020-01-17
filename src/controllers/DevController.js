const Dev = require("../models/Dev");
const github = require("../services/github");
const parseStringAsArray = require("../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");

module.exports = {
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    const devexists = await Dev.findOne({ github_username });

    if (devexists) {
      return res.json(devexists);
    }

    let response;
    try {
      response = await github(github_username);
    } catch (e) {
      return res.status(404).json({ error: "User not found" });
    }
    const { name, bio, avatar_url } = response;
    const techsArray = parseStringAsArray(techs);

    const location = {
      type: "Point",
      coordinates: [longitude, latitude]
    };

    const dev = await Dev.create({
      name,
      github_username,
      avatar_url,
      bio,
      techs: techsArray,
      location
    });

    //Filtrar as conexões que estão no máximo a 10km de distância
    //e que o novo deve tenha pelo menos uma das tecnologias filtradas

    const sendSocketMessageTo = findConnections(
      { latitude, longitude },
      techsArray
    );

    sendMessage(sendSocketMessageTo, "new-dev", dev);

    return res.json(dev);
  },
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async update(req, res) {
    const { id } = req.params;
    const { name, techs, latitude, longitude } = req.body;

    let dev;
    try {
      dev = await Dev.findById(id);
    } catch (e) {
      res.status(500).json({ error: "Id invalid" });
    }

    if (!dev) {
      return res.status(404).json({ error: "User not found" });
    }

    const techsArray = parseStringAsArray(techs);

    const location = {
      type: "Point",
      coordinates: [longitude, latitude]
    };

    const updatedUser = await Dev.findByIdAndUpdate(
      id,
      {
        name,
        techs: techsArray,
        location
      },
      { new: true }
    );

    return res.json(updatedUser);
  },

  async destroy(req, res) {
    const { id } = req.params;

    let dev;
    try {
      dev = await Dev.findById(id);
    } catch (e) {
      res.status(500).json({ error: "Id invalid" });
    }

    if (!dev) {
      return res.status(404).json({ error: "User not found" });
    }

    dev.remove();
    return res.json({});
  }
};
