const db = require("../../data/db-config")

const adimIdyeGoreIcindekilerGetir = async (adim_id) => {

    let icindekiler = await db("icindekiler_adimlar as ia")
        .leftJoin(
            "icindekiler as i",
            "i.icindekiler_id",
            "ia.icindekiler_id"
        )
        .leftJoin(
            "adimlar as a",
            "a.adim_id",
            "ia.adim_id"
        )
        .select(
            "ia.icindekiler_id",
            "i.icindekiler_adi",
            "ia.miktar"
        )
        .where("ia.adim_id", adim_id);

    return icindekiler;
}

const idyeGoreTarifGetir = async (tarif_id) => {

    const tarifler = await db("tarifler as t")
        .leftJoin(
            "adimlar as a",
            "a.tarif_id",
            "t.tarif_id"
        )
        .leftJoin(
            "icindekiler_adimlar as ia",
            "ia.adim_id",
            "a.adim_id"
        )
        .leftJoin(
            "icindekiler as i",
            "i.icindekiler_id",
            "ia.icindekiler_id"
        )
        .select(
            "t.*",
            "a.adim_id",
            "a.adim_sirasi",
            "a.adim_talimati",
            "i.icindekiler_id",
            "i.icindekiler_adi",
            "ia.miktar"
        )
        .where("t.tarif_id", tarif_id);

    if (tarifler.length == 0) {
        return null;
    };

    let responseTarifModel = {
        tarif_id: tarifler[0].tarif_id,
        tarif_adi: tarifler[0].tarif_adi,
        kayit_tarihi: tarifler[0].kayit_tarihi,
        adimlar: []
    };

    for (let i = 0; i < tarifler.length; i++) {
        const tarif = tarifler[i];
        let adimModel = {
            adim_id: tarif.adim_id,
            adim_sirasi: tarif.adim_sirasi,
            adim_talimati: tarif.adim_talimati,
            icindekiler: []
        };

        if (!!tarif.icindekiler_id) {
            let fromDb = await adimIdyeGoreIcindekilerGetir(tarif.adim_id);
            adimModel.icindekiler = fromDb;
        }

        // for (let j = 0; j < tarif.length; j++) {
        //     const item = tarif[j];
        //     if (!!item.icindekiler_id && tarif.adim_id == item.adim_id) {
        //         let icindekilerModel = {
        //             icindekiler_id: item.icindekiler_id,
        //             icindekiler_adi: item.icindekiler_adi,
        //             miktar: item.miktar
        //         };
        //         adimModel.icindekiler.push(icindekilerModel);
        //     };
        // }

        responseTarifModel.adimlar.push(adimModel);
    }

    return responseTarifModel;
};

module.exports = {
    idyeGoreTarifGetir
}