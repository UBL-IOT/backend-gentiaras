const mongoose = require("mongoose");
const collectionName = "user";

const InstitutionSchema = new mongoose.Schema(
  {
    GUID: {
      type: String
    },
    NAME: {
      type: String
    },
    INSTANSI: {
      type: String
    },
    USERNAME: {
      type: String
    },
    PASSWORD: {
      type: String
    },
    ROLE: {
      type: String
    }
  },
  {
    versionKey: false,
    collection: collectionName
  }
);

module.exports = mongoose.model(collectionName, InstitutionSchema);
