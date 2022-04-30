const mongoose = require("mongoose");
const collectionName = "pegawai";
const InstitutionSchema = new mongoose.Schema(
    {
        GUID: {
            type: String
        },
        INSTANSI: {
            type: String
        },
        NAME: {
            type: String
        },
        EMAIL: {
            type: String
        },
        NIK: {
            type: String
        },
        NO_HP: {
            type: String
        },
        FOTO: {
            type: String
        },
        FOTO_KTP: {
            type: String
        },
        UNIT: {
            type: String
        },
        ALAMAT: {
            type: String
        },
        LOCATION: {
            LAT: {
                type: String
            },
            LONG: {
                type: String
            },
        }
    },
    {
        versionKey: false,
        collection: collectionName
    }
);

module.exports = mongoose.model(collectionName, InstitutionSchema);
