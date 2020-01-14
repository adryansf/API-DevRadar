const mongoose = require("mongoose");

module.exports = mongoose.connect(
  "mongodb+srv://omni10:omni10@cluster0-ryy0l.mongodb.net/omni10?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);
