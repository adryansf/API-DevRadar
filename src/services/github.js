const axios = require("axios");

const api = axios.create({
  baseURL: "https://api.github.com/users/"
});

const getUser = async username => {
  const { data } = await api.get(username);
  return data;
};

module.exports = getUser;
