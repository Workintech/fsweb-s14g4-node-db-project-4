/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable("tarifler", tbl => {
            tbl.increments("tarif_id");
            tbl.string("tarif_adi")
                .notNullable();
            tbl.timestamp("kayit_tarihi")
                .defaultTo(knex.fn.now())
        })
        .createTable("adimlar", tbl => {
            tbl.increments("adim_id");
            tbl.integer("adim_sirasi")
                .notNullable();
            tbl.string("adim_talimati")
                .notNullable();
            tbl.integer("tarif_id").references("tarif_id").inTable("tarifler")
                .onDelete("CASCADE") // RESTRICT
                .onUpdate("CASCADE") // RESTRICT
        })
        .createTable("icindekiler", tbl => {
            tbl.increments("icindekiler_id");
            tbl.string("icindekiler_adi")
                .notNullable();
        })
        .createTable("icindekiler_adimlar", tbl => {
            tbl.increments("icindekiler_adim_id");
            tbl.decimal("miktar")
                .notNullable();
            tbl.integer("icindekiler_id").references("icindekiler_id").inTable("icindekiler")
            tbl.integer("adim_id").references("adim_id").inTable("adimlar")
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("icindekiler_adimlar")
        .dropTableIfExists("icindekiler")
        .dropTableIfExists("adimlar")
        .dropTableIfExists("tarifler")
};
