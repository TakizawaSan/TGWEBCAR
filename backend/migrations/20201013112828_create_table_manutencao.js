
exports.up = function(knex, Promise) {
    return knex.schema.createTable('manutencao', table => {
        table.increments('id').primary()
        table.string('dataInicio').notNull()
        table.string('dataTermino')
        table.string('titulo').notNull()
        table.string('descricao').notNull()
        table.integer('idVeiculo').references('id').inTable('veiculo').notNull()
        table.integer('idMecanico').references('id').inTable('mecanico').notNull()
        
        
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('manutencao')
};
