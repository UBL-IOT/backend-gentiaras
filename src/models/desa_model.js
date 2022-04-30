const mongoose = require("mongoose");
const collectionName = "desa";

const InstitutionSchema = new mongoose.Schema(
    {
        id_kel: {
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
