/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const defaultTarifler = [
  { tarif_adi: "Spagetti Bolonez" },
  { tarif_adi: "Mantı" }
];
const defaultAdimlar = [
  { adim_id: 1, adim_sirasi: 1, adim_talimati: "Büyük bir tencereyi orta ateşe koyun", tarif_id: 1 },
  { adim_id: 2, adim_sirasi: 2, adim_talimati: "1 yemek kaşığı zeytinyağı ekleyin", tarif_id: 1 },
  { adim_id: 3, adim_sirasi: 3, adim_talimati: "1 tatlı kaşığı tuz ekleyin", tarif_id: 1 },

  { adim_id: 4, adim_sirasi: 1, adim_talimati: "Küçük bir tencereyi orta ateşe koyun", tarif_id: 2 },
  { adim_id: 5, adim_sirasi: 2, adim_talimati: "2 yemek kaşığı zeytinyağı ekleyin", tarif_id: 2 },
  { adim_id: 6, adim_sirasi: 3, adim_talimati: "3 çay kaşığı tuz ekleyin", tarif_id: 2 }
];
const defaultIcindekiler = [
  { icindekiler_adi: "zeytinyağı" },
  { icindekiler_adi: "tuz" }
];
const defaultIcindekilerAdimlar = [
  { icindekiler_id: 1, adim_id: 2, miktar: 1 },
  { icindekiler_id: 1, adim_id: 5, miktar: 2 },
  { icindekiler_id: 2, adim_id: 3, miktar: 0.5 },
  { icindekiler_id: 2, adim_id: 6, miktar: 0.75 }
];
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('tarifler').truncate();
  await knex('adimlar').truncate();
  await knex('icindekiler').truncate();
  await knex('icindekiler_adimlar').truncate();

  await knex('tarifler').insert(defaultTarifler);
  await knex('adimlar').insert(defaultAdimlar);
  await knex('icindekiler').insert(defaultIcindekiler);
  await knex('icindekiler_adimlar').insert(defaultIcindekilerAdimlar);
};
