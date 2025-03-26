const db = require("../db");
const bcrypt = require("bcryptjs");

async function addUser(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (email, password) values ($1, $2)", [email, hashedPassword]);
}

module.exports = {
    addUser
}