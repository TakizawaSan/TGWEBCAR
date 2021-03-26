
exports.up = function(knex,Promise) {
    return knex.schema.createTable('manutencao-atividade', table => {
        table.increments('id').primary()
        table.string('dataInicio').notNull()
        table.string('dataTermino').notNull()
        table.string('descricao').notNull()
        table.string('observação')
        table.integer('idManutencao').references('id').inTable('manutencao')
        table.integer('idAtividade').references('id').inTable('atividade')

    })
};

exports.down = function(knex,Promise) {
    return knex.schema.dropTable('manutencao-atividade')
};