let mongoose = require("mongoose");

// create a model class
let surveySchema = mongoose.Schema(
  {
    //Attributes still to decide
  },
  {
    collection: "survey"
  }
);

module.exports = mongoose.model("survey", surveySchema);
