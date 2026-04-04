exports.up = function (knex) {
  return knex.schema
    // 1. Tarifler tablosu
    .createTable('tarifler', (tbl) => {
      tbl.increments('tarif_id');
      tbl.string('tarif_adi').notNullable().unique();
      tbl.timestamp('kayit_tarihi').defaultTo(knex.fn.now());
    })
    // 2. Adımlar tablosu
    .createTable('adimlar', (tbl) => {
      tbl.increments('adim_id');
      tbl.integer('adim_sirasi').notNullable();
      tbl.string('adim_talimati', 1024).notNullable();
      tbl.integer('tarif_id').notNullable().references('tarif_id').inTable('tarifler').onDelete('CASCADE');
    })
    // 3. Malzemeler tablosu
    .createTable('malzemeler', (tbl) => {
      tbl.increments('icindekiler_id');
      tbl.string('icindekiler_adi').notNullable().unique();
    })
    // 4. Adım-Malzeme köprü tablosu (miktar burada!)
    .createTable('adim_malzeme', (tbl) => {
      tbl.increments('id');
      tbl.integer('adim_id').notNullable().references('adim_id').inTable('adimlar').onDelete('CASCADE');
      tbl.integer('icindekiler_id').notNullable().references('icindekiler_id').inTable('malzemeler').onDelete('CASCADE');
      tbl.float('miktar').notNullable().defaultTo(0);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('adim_malzeme')
    .dropTableIfExists('malzemeler')
    .dropTableIfExists('adimlar')
    .dropTableIfExists('tarifler');
};
