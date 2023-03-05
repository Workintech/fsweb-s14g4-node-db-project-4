const db = require("../../data/db.config");


const icindekileriGetir = async function (adim_id) {
    const icindekiler = await db("icindekiler_adimlar as ia")
        .leftJoin("icindekiler as i", "ia.icindekiler_id", "i.icindekiler_id")
        .select("i.*")
    return icindekiler;
}
const idyeGoreTarifGetir = async function (tarif_id) {
    const tarifler = await db("tarifler as t")
        .leftJoin("adimlar as a", "t.tarif_id", "a.tarif_id")
        .leftJoin("icindekiler_adimlar as ia", "ia.adim_id", "a.adim_id")
        .leftJoin("icindekiler as i", "ia.icindekiler_id", "i.icindekiler_id")
        .select(
            "t.*", "a.adim_id", "a.adim_sirasi", "a.adim_talimati",
            "i.icindekiler_id", "i.icindekiler_adi", "i.miktar"
        )
        .where("t.tarif_id", tarif_id);
    if (tarifler.length === 0) {
        return [];
    }
    const tarifModel = {
        tarif_id: tarif_id,
        tarif_adi: tarifler[0],
        kayit_tarihi: tarifler[0].kayit_tarihi,
        adimlar: []
    }
    tarifler.forEach(async (tarif) => {


    });
    for (let i = 0; i < tarifler.length; i++) {
        const tarif = tarifler[i];
    }
    return tarifModel;
}
module.exports = {
    idyeGoreTarifGetir
}