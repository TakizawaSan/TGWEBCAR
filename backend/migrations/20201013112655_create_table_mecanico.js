
exports.up = function(knex,Promise) {
    return knex.schema.createTable('mecanico', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('telefone').notNull()
        table.integer('idLogin').references('id').inTable('login').notNull()
    })
};

exports.down = function(knex,Promise) {
    return knex.schema.dropTable('mecanico')
};

