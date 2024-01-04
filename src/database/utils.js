const findOne = async (pool, table, fields, values) => {
    const query = `SELECT * FROM ${table} WHERE ${fields.map(field => `${field} = ?`)} LIMIT 1`;

    try {
        const result = await pool.query(query, values);
        console.log("Success!");
        return result[0];
    } catch (error) {
        console.log("Error: ", error);
        throw "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút!";
    }
}

const find = async (pool, table, fields = null, values = null) => {
  let query;

  if (fields !== null && values !== null) {
    const conditions =  fields.map(field => `${field} = ? `).join(' AND ');
    query = `SELECT * FROM ${table} WHERE ${conditions}`;
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
      throw "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút!";
  }
}


const insert = async (pool, table, fields, values) => {
    const query = `INSERT INTO ${table} (${fields.map(field => `${field}`)}) VALUES (${fields.map(field => `?`)})`;
    
    try {
        const result = await pool.query(query, values);
        return result;
    } catch (error) {
        console.log("Error: ", error);
        throw "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút!";
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
        throw "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút!";
    }
}

const getLastRow = async (pool, table) => {
    const query = `SELECT * FROM ?? ORDER BY id DESC LIMIT 1`;
    
    try {
        const result = await pool.query(query, [table]);
        
        if (result.length > 0) {
            return result[0][0];
        }
        
        return null;
    } catch (error) {
        console.log("Error: ", error);
        throw "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút!";
    }
}
const cancel=async (pool, table, fields, values)=>
{
    const query = `DELETE FROM ${table} WHERE ${fields.map(field => `${field} = ?`)} `;

    try {
        const result = await pool.query(query, values);
        console.log("Success!");
    } 
    catch (error) {
        console.log("Error: ", error);
        throw "Đã xảy ra lỗi. Vui lòng thử lại sau ít phút!";
    }
}

module.exports = {
    findOne,
    find,
    insert,
    update,
    getLastRow,
    cancel,
}
