const findOne = async (pool, table, fields, values) => {
    const query = `SELECT * FROM ${table} WHERE ${fields.map(field => `${field} = ?`)} LIMIT 1`;

    try {
        const result = await pool.query(query, values);
        console.log("Success!");
        return result[0];
    } catch (error) {
        console.log("Error: ", error);
        throw "Lỗi cơ sở dữ liệu!";
    }
}

const find = async (pool, table, fields = null, values = null) => {
    let query;

    if (fields !== null && values !== null) {
        query = `SELECT * FROM ${table} WHERE ${fields.map(field => `${field} = ?`)}`;
    }
    else {
        query = `SELECT * FROM ${table}`;
    }

    try {
        const result = await pool.query(query, values);
        console.log("Success!");
        return result[0];
    } catch (error) {
        console.log("Error: ", error);
        throw "Lỗi cơ sở dữ liệu!";
    }
}

const insert = async (pool, table, fields, values) => {
    const query = `INSERT INTO ${table} (${fields.map(field => `${field}`)}) VALUES (${fields.map(field => `?`)})`;
    try {
        const result = await pool.query(query, values);
        return result;
    } catch (error) {
        console.log("Error: ", error);
        throw "Lỗi cơ sở dữ liệu!";
    }
}

const update = async (pool, table, fields, values, conditionFields, conditionValues) => {
    const setClause = fields.map(field => `${field} = ?`).join(", ");
    const whereClause = conditionFields.map(conditionField => `${conditionField} = ?`).join(" AND ");
    
    const query = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
    
    try {
        const result = await pool.query(query, [...values, ...conditionValues]);
        return result;
    } catch (error) {
        console.log("Error: ", error);
        throw "Lỗi cơ sở dữ liệu!";
    }
}

module.exports = {
    findOne,
    find,
    insert,
    update,
}