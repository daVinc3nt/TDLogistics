const mysql = require("mysql2");
const utils = require("./utils");

const dbOptions = {
    host: process.env.HOST,
    port: process.env.DBPORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
};

const table = "customer_user";

const pool = mysql.createPool(dbOptions).promise();

const checkExistUser = async (phoneNumber) => {
    const result = await utils.findOne(pool, table, ["phone"], [phoneNumber]);
    return result.length > 0;
};

const createNewUser = async (newUser) => {
    const lastUser = await utils.getLastRow(pool, table);

    let userId = "000000000";

    if (lastUser) {
        userId = (parseInt(lastUser["user_id"]) + 1).toString().padStart(9, "0");
    }

    const { fullname, email, phoneNumber } = newUser;
    await utils.insert(pool, table, ["user_id", "fullname", "email", "phone"], [userId, fullname, email, phoneNumber]);
}

const getAllUsers = async () => {
    return await utils.find(pool, table);
}

const getUser = async (fields, values) => {
    return await utils.find(pool, table, fields, values);
}

const updateUserInfo = async (fields, values, conditionFields, conditionValues) => {
    await utils.update(pool, table, fields, values, conditionFields, conditionValues);
}

const getSessionID = async (sessionID) => {
  const result = await utils.findOne(pool, sessions, ["session_id"], [sessionID]);
  return result.length > 0;
};

module.exports = {
    checkExistUser,
    createNewUser,
    getAllUsers,
    getUser,
    updateUserInfo,
    getSessionID,
}
