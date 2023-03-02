/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 *            Tarifler tablosu		
   tarif_id(pk)	         tarif_adi	            kayit_tarihi

              Adımlar tablosu			
   adim_id(pk)	adim_sirası	 adim_talimatı	tarif_id(fk)

              İçindekiler tablosu		
    icindekiler_id(pk)	icindekiler_adi	 miktar

                Ortak Tablo		
    icindekiler_id(fk)	adim_id(fk)	 tarif_id(fk)
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("tarifler", (tbl) => {
      tbl.increments("tarif_id"); //tarif_id(pk)
      tbl.string("tarif_adi", 128).notNullable().unique();
      tbl.timestamp("kayit_tarihi").defaultTo(knex.fn.now()); //default olursa o günü alsın.
    })
    .createTable("adimlar", (tbl) => {
      tbl.increments("adim_id"); //adim_id(pk)
      tbl.integer("adim_sirasi").notNullable().unsigned();
      tbl.string("adim_talimati").notNullable();
      tbl
        .integer("tarif_id")
        .unsigned()
        .notNullable()
        .references("tarif_id")
        .inTable("tarifler")
        .onUpdate("CASCADE")
        .onDelete("CASCADE"); //many to many //tarif_id(fk)
    })
    .createTable("icindekiler", (tbl) => {
      tbl.increments("icindekiler_id"); //icindekiler_id(pk)
      tbl.string("icindekiler_adi", 128).notNullable();
      tbl.float("miktar").notNullable();
    })
    .createTable("icindekiler_adimlar", (tbl) => {
      tbl.increments("icindekiler_adimlar_id");
      tbl
        .integer("adim_id")
        .references("adim_id")
        .inTable("adimlar")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("icindekiler_id")
        .references("icindekiler_id")
        .inTable("icindekiler")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("icindekiler_adimlar")
    .dropTableIfExists("adimlar")
    .dropTableIfExists("icindekiler")
    .dropTableIfExists("tarifler");
};
