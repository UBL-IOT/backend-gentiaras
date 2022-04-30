const mongoose = require("mongoose");
const collectionName = "kabupaten";

const InstitutionSchema = new mongoose.Schema(
    {
        id_kab: {
            type: String
        },
        id_prov: {
            type: String
        },
        nama: {
            type: String
        },
        id_jenis: {
            type: String
        },
    },
    {
        versionKey: false,
        collection: collectionName
    }
);

module.exports = mongoose.model(collectionName, InstitutionSchema);
