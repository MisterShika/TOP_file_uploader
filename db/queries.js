const db = require("../db");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addUser(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
        `INSERT INTO "User" (id, email, password) VALUES (gen_random_uuid(), $1, $2)`,
        [email, hashedPassword]
    );
}

async function addFile(name, path, userId) {
    await db.query(
        `INSERT INTO "Folder" ("id", "name", "path", "userId") VALUES (gen_random_uuid(), $1, $2, $3)`,
        [name, path, userId]
    );
}

async function getFoldersByUserId(userId) {
    try {
        const folders = await prisma.folder.findMany({
            where: {
                userId: userId,
            },
        });
        return folders;
    } catch (error) {
        console.error("Error fetching folders: ", error);
        throw error;
    }
}

module.exports = {
    addUser,
    addFile,
    getFoldersByUserId
}