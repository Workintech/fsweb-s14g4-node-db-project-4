const db = require('../data/db-config');

/**
 * Verilen tarif_id'ye göre tarifi tüm adım ve malzemeleriyle birlikte getirir.
 * Tek sorguda JOIN kullanarak veritabanına yalnızca bir kez gider.
 */
async function idyeGoreTarifGetir(tarif_id) {
  // Tek büyük JOIN sorgusu - veritabanına tek ziyaret
  const satirlar = await db('tarifler as t')
    .leftJoin('adimlar as a', 't.tarif_id', 'a.tarif_id')
    .leftJoin('adim_malzeme as am', 'a.adim_id', 'am.adim_id')
    .leftJoin('malzemeler as m', 'am.icindekiler_id', 'm.icindekiler_id')
    .where('t.tarif_id', tarif_id)
    .select(
      't.tarif_id',
      't.tarif_adi',
      't.kayit_tarihi',
      'a.adim_id',
      'a.adim_sirasi',
      'a.adim_talimati',
      'm.icindekiler_id',
      'm.icindekiler_adi',
      'am.miktar'
    )
    .orderBy(['a.adim_sirasi']);

  if (!satirlar.length) return null;

  // İlk satırdan tarif bilgilerini al
  const { tarif_id: tid, tarif_adi, kayit_tarihi } = satirlar[0];

  // Adımları bir Map'te topla (adim_id → adım nesnesi)
  const adimMap = new Map();

  for (const satir of satirlar) {
    if (!satir.adim_id) continue; // Adımı olmayan tarif (olmamalı ama güvenlik için)

    if (!adimMap.has(satir.adim_id)) {
      adimMap.set(satir.adim_id, {
        adim_id: satir.adim_id,
        adim_sirasi: satir.adim_sirasi,
        adim_talimati: satir.adim_talimati,
        icindekiler: [],
      });
    }

    // Malzeme varsa ekle
    if (satir.icindekiler_id) {
      adimMap.get(satir.adim_id).icindekiler.push({
        icindekiler_id: satir.icindekiler_id,
        icindekiler_adi: satir.icindekiler_adi,
        miktar: satir.miktar,
      });
    }
  }

  return {
    tarif_id: tid,
    tarif_adi,
    kayit_tarihi,
    adimlar: Array.from(adimMap.values()),
  };
}

/**
 * Yeni bir tarif oluşturur (Görev 3 - Esnek Görev).
 * Knex transaction kullanarak atomik işlem sağlar.
 */
async function tarifOlustur(tarifData) {
  const { tarif_adi, adimlar } = tarifData;

  return db.transaction(async (trx) => {
    // 1. Tarifi ekle
    const [tarif_id] = await trx('tarifler').insert({ tarif_adi });

    // 2. Her adımı ekle
    for (const adim of adimlar) {
      const [adim_id] = await trx('adimlar').insert({
        tarif_id,
        adim_sirasi: adim.adim_sirasi,
        adim_talimati: adim.adim_talimati,
      });

      // 3. Adımın malzemelerini ekle (varsa)
      if (adim.icindekiler && adim.icindekiler.length > 0) {
        const malzemeSatirlari = adim.icindekiler.map((m) => ({
          adim_id,
          icindekiler_id: m.icindekiler_id,
          miktar: m.miktar,
        }));
        await trx('adim_malzeme').insert(malzemeSatirlari);
      }
    }

    // Oluşturulan tarifi döndür
    return idyeGoreTarifGetir(tarif_id);
  });
}

/**
 * Tüm mevcut malzemeleri listeler.
 */
function malzemeleriGetir() {
  return db('malzemeler').select('*').orderBy('icindekiler_adi');
}

module.exports = { idyeGoreTarifGetir, tarifOlustur, malzemeleriGetir };
