const mongoose = require("mongoose");
const collectionName = "instansi";

const InstitutionSchema = new mongoose.Schema(
  {
    GUID: {
      type: String
    },
    NAMA_INSTANSI: {
      type: String
    },
    EMAIL: {
      type: String
    },
    NO_HP: {
      type: String
    },
    ALAMAT: {
      type: String
    },
    AREA: {
      PROV: Object,
      KAB: Object,
      KEC: Object,
    },
    DESKRIPSI: {
      type: String
    },
    LOGO: {
      type: String
    },
    CREATED_AT: {
      type: Date,
      default: new Date()
    },
    UPDATED_AT: {
      type: Date,
      default: new Date()
    }
  },
  {
    versionKey: false,
    collection: collectionName
  }
);

module.exports = mongoose.model(collectionName, InstitutionSchema);
