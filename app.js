require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 8080;
const mongoose = require("mongoose");
const usrRouter = require("./routes/UserRouter");

app.use(express.json());
app.use("/api/users", usrRouter);

async function main() {
    await mongoose.connect(process.env.MONGO_URL)
}

main().then(() => console.log("Database is connected")).catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
});