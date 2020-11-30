
exports.up = function(knex,Promise) {
    return knex.schema.createTable('oficina', table => {
        table.increments('id').primary()
        table.string('nomeFantasia').notNull()
        table.string('proprietario').notNull()
        table.string('telefone').notNull()
        table.string('horarioFuncionamento').notNull()
        table.string('diasFuncionamento').notNull()
        table.string('almoco').notNull()
        table.string('status')
        table.integer('idLogin').references('id').inTable('login').notNull()
    })
};

exports.down = function(knex,Promise) {
    return knex.schema.dropTable('oficina')
};

