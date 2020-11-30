
exports.up = function(knex,Promise) {
    return knex.schema.createTable('cliente', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('telefone').notNull()
        table.string('endereco').notNull()
        table.string('numero').notNull()
        table.string('complemento').notNull()
        table.integer('idLogin').references('id').inTable('login').notNull()
    })
};

exports.down = function(knex,Promise) {
    return knex.schema.dropTable('cliente')
};


