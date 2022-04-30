const mongoose = require("mongoose");
const collectionName = "provinsi";

const InstitutionSchema = new mongoose.Schema(
    {
        id_prov: {
            type: String
        },
        nama: {
            type: String
        },
    },
    {
        versionKey: false,
        collection: collectionName
    }
);

module.exports = mongoose.model(collectionName, InstitutionSchema);
