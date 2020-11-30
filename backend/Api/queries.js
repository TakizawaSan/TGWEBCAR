module.exports = {
    categoryWithChildren: `
        WITH RECURSIVE subcategories (id) AS (
            SELECT id FROM categories WHERE id = ?
            
            UNION ALL
            
            SELECT c.id FROM subcategories, categories c
                WHERE "parentId" = subcategories.id
        )
        SELECT id from subcategories
    `,
    generoWithChildren:`
    WITH RECURSIVE subgeneros(id) AS (
        SELECT id FROM generos WHERE id = ?
        
        UNION ALL
        
        SELECT c.id FROM subgeneros, generos c
            WHERE "parentId" = subgeneros.id
    )
    SELECT id from subgeneros
`
}