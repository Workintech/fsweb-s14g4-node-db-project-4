exports.seed = async function (knex) {
  // Temizlik
  await knex('adim_malzeme').del();
  await knex('adimlar').del();
  await knex('malzemeler').del();
  await knex('tarifler').del();

  // Tarifler
  await knex('tarifler').insert([
    { tarif_id: 1, tarif_adi: 'Spagetti Bolonez' },
    { tarif_id: 2, tarif_adi: 'Omlet' },
  ]);

  // Malzemeler
  await knex('malzemeler').insert([
    { icindekiler_id: 1, icindekiler_adi: 'zeytinyağı' },
    { icindekiler_id: 2, icindekiler_adi: 'kıyma' },
    { icindekiler_id: 3, icindekiler_adi: 'domates sosu' },
    { icindekiler_id: 4, icindekiler_adi: 'spagetti' },
    { icindekiler_id: 5, icindekiler_adi: 'yumurta' },
    { icindekiler_id: 6, icindekiler_adi: 'tuz' },
  ]);

  // Adımlar - Spagetti Bolonez (tarif_id: 1)
  await knex('adimlar').insert([
    { adim_id: 11, tarif_id: 1, adim_sirasi: 1, adim_talimati: 'Büyük bir tencereyi orta ateşe koyun' },
    { adim_id: 12, tarif_id: 1, adim_sirasi: 2, adim_talimati: '1 yemek kaşığı zeytinyağı ekleyin' },
    { adim_id: 13, tarif_id: 1, adim_sirasi: 3, adim_talimati: 'Kıymayı ekleyip pembeleşene kadar kavurun' },
    { adim_id: 14, tarif_id: 1, adim_sirasi: 4, adim_talimati: 'Domates sosunu ekleyip 20 dk pişirin' },
    { adim_id: 15, tarif_id: 1, adim_sirasi: 5, adim_talimati: 'Spagettileri haşlayın ve sosla karıştırın' },
    // Adımlar - Omlet (tarif_id: 2)
    { adim_id: 21, tarif_id: 2, adim_sirasi: 1, adim_talimati: 'Yumurtaları bir kaseye kırın' },
    { adim_id: 22, tarif_id: 2, adim_sirasi: 2, adim_talimati: 'Tuz ekleyip çırpın' },
    { adim_id: 23, tarif_id: 2, adim_sirasi: 3, adim_talimati: 'Tavaya zeytinyağı ekleyip kızdırın' },
    { adim_id: 24, tarif_id: 2, adim_sirasi: 4, adim_talimati: 'Yumurtaları dökün ve pişirin' },
  ]);

  // Adım-Malzeme ilişkileri
  await knex('adim_malzeme').insert([
    // Adım 12: zeytinyağı 1 kaşık
    { adim_id: 12, icindekiler_id: 1, miktar: 0.014 },
    // Adım 13: kıyma 200g
    { adim_id: 13, icindekiler_id: 2, miktar: 0.200 },
    // Adım 14: domates sosu 300ml
    { adim_id: 14, icindekiler_id: 3, miktar: 0.300 },
    // Adım 15: spagetti 200g
    { adim_id: 15, icindekiler_id: 4, miktar: 0.200 },
    // Omlet adım 21: yumurta 2 adet
    { adim_id: 21, icindekiler_id: 5, miktar: 2 },
    // Omlet adım 22: tuz
    { adim_id: 22, icindekiler_id: 6, miktar: 0.005 },
    // Omlet adım 23: zeytinyağı
    { adim_id: 23, icindekiler_id: 1, miktar: 0.007 },
  ]);
};
