require("dotenv").config();
const mongoose = require('mongoose');
const User = require('./models/UserSchema');
const fs = require('fs');


async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DB...");
        await User.init();
        const db = mongoose.connection.db;
        const indexes = await db.collection("users").indexes();

        console.log("db.users.getIndexes() output:\n");
        console.log(JSON.stringify(indexes, null, 2));

        const output = `
db.users.getIndexes() output:
${JSON.stringify(indexes, null, 2)}`;

        fs.writeFileSync('db_indexes_and_justification.txt', output);
        console.log("Successfully wrote db_indexes_and_justification.txt");

        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

main();
