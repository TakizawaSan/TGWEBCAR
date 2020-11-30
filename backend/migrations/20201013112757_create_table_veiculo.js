
exports.up = function(knex,Promise) {
    return knex.schema.createTable('veiculo', table => {
        table.increments('id').primary()
        table.string('descricao').notNull()
        table.string('ano').notNull()
        table.string('placa').notNull()
        table.integer('idCliente').references('id').inTable('cliente').notNull()
    })
};

exports.down = function(knex,Promise) {
    return knex.schema.dropTable('veiculo')
};