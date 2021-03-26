
exports.up = function(knex, Promise) {
    return knex.schema.createTable('atividade', table => {
        table.increments('id').primary()
        table.string('titulo').notNull()
        table.string('descricao').notNull()
        table.decimal('tempoEstimado').notNull()
        table.integer('idAtividade').references('id').inTable('atividade')

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('atividade')
};
