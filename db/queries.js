const db = require("../db");
const bcrypt = require("bcryptjs");

async function addUser(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
        `INSERT INTO "User" (id, email, password) VALUES (gen_random_uuid(), $1, $2)`,
        [email, hashedPassword]
    );
}

module.exports = {
    addUser
}