const mongoose = require("mongoose");
const collectionName = "unit";

const InstitutionSchema = new mongoose.Schema(
    {
        GUID: {
            type: String
        },
        INSTANSI: {
            type: String
        },
        NAMA: {
            type: String
        },
        KETERANGAN :{
            type: String
        }

    },
    {
        versionKey: false,
        collection: collectionName
    }
);

module.exports = mongoose.model(collectionName, InstitutionSchema);
