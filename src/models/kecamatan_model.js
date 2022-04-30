const mongoose = require("mongoose");
const collectionName = "kecamatan";

const InstitutionSchema = new mongoose.Schema(
    {
        id_kab: {
            type: String
        },
        id_kec: {
            type: String
        },
        nama: {
            type: String
        }
    },
    {
        versionKey: false,
        collection: collectionName
    }
);

module.exports = mongoose.model(collectionName, InstitutionSchema);
