
exports.up = function(knex, Promise) {
    return knex.schema.createTable('login', table => {
        table.increments('id').primary()
        table.string('usuario').notNull()
        table.string('senha').notNull()

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('login')
};
