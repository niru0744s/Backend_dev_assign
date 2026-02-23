const express = require("express");
const router = express.Router();
const { bulkInsertUsers, bulkUpdateUsers } = require("../controllers/userController");


router.post("/bulk-insert", bulkInsertUsers);
router.put("/bulk-update", bulkUpdateUsers);

module.exports = router;