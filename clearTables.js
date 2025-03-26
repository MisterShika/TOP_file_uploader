require('dotenv').config();
const { Client } = require("pg");

const SQL = `
    DROP TABLE IF EXISTS users CASCADE;
`;

async function clearTables () {
    console.log("Deleting tables...");
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("Tables deleted.");
};

clearTables();