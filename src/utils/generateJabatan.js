const { v4 } = require("uuid");
module.exports = (institusi_code) => {
    return [{
        GUID : v4(),
        INSTITUSI_CODE : institusi_code,
        JABATAN_CODE: "KEPSEK",
        NAMA: "KEPALA SEKOLAH",
        LEVEL: "KEPSEK",
        KETERANGAN: "-",
        CAN_DELETE: false
    },
    {
        GUID : v4(),
        INSTITUSI_CODE : institusi_code,
        JABATAN_CODE: "KAJUR",
        NAMA: "KEPALA JURUSAN",
        LEVEL: "KAJUR",
        KETERANGAN: "-",
        CAN_DELETE: false
    },
    {
        GUID : v4(),
        INSTITUSI_CODE : institusi_code,
        JABATAN_CODE: "WAKASEK",
        NAMA: "WAKIL KEPALA SEKOLAH",
        LEVEL: "WAKASEK",
        KETERANGAN: "-",
        CAN_DELETE: false
    },
    {
        GUID : v4(),
        INSTITUSI_CODE : institusi_code,
        JABATAN_CODE: "GURU",
        NAMA: "GURU ABSEN",
        LEVEL: "GURU",
        KETERANGAN: "-",
        CAN_DELETE: false
    },
    {
        GUID : v4(),
        INSTITUSI_CODE : institusi_code,
        JABATAN_CODE: "WALI_KELAS",
        NAMA: "WALI KELAS",
        LEVEL: "WALI_KELAS",
        KETERANGAN: "-",
        CAN_DELETE: false
    },
    {
        GUID : v4(),
        INSTITUSI_CODE : institusi_code,
        JABATAN_CODE: "KEUANGAN",
        NAMA: "KEUANGAN",
        LEVEL: "KEUANGAN",
        KETERANGAN: "-",
        CAN_DELETE: false
    },
    {
        GUID : v4(),
        INSTITUSI_CODE : institusi_code,
        JABATAN_CODE: "STAFF",
        NAMA: "STAFF",
        LEVEL: "STAFF",
        KETERANGAN: "-",
        CAN_DELETE: false
    }]
}

