const mongoose = require("mongoose");
const collectionName = "laporan";

const InstitutionSchema = new mongoose.Schema(
    {
        GUID: {
            type: String
        },
        USERNAME: {
            type: String
        },
        INSTANSI: {
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
        },
        JENISLAPORAN: {
            type: String
        },
        LAPORAN: {
            type: String
        },
        FOTO: {
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
