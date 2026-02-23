const User = require("../models/UserSchema");

// Bulk insertion of users
const bulkInsertUsers = async (req, res) => {
    try {
        const usersData = req.body;

        if (!Array.isArray(usersData) || usersData.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid data format. Expected a non-empty array of users." });
        }

        const result = await User.insertMany(usersData, { ordered: false });

        return res.status(201).json({
            success: true,
            message: `Successfully inserted ${result.length} users.`,
            insertedCount: result.length,
            userData:result
        });
    } catch (error) {
        console.error("Error in bulkInsertUsers:", error);
        if (error.name === 'BulkWriteError' && error.result && error.result.insertedCount !== undefined) {
            return res.status(207).json({
                success: true,
                message: `Partially inserted ${error.result.insertedCount} users. Some failed due to duplicates or validation.`,
                insertedCount: error.result.insertedCount,
                errorCount: error.writeErrors ? error.writeErrors.length : 0
            });
        }

        return res.status(500).json({ success: false, message: "Internal server error during bulk insertion.", error: error.message || error });
    }
};

const bulkUpdateUsers = async (req, res) => {
    try {
        const usersData = req.body;

        if (!Array.isArray(usersData) || usersData.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid data format. Expected a non-empty array of users." });
        }

        const bulkOps = usersData.map(user => {
            // Using `phone` as the unique identifier for updating if `_id` is not present
            const filter = user._id ? { _id: user._id } : { phone: user.phone };

            const { _id, phone, ...updateFields } = user;

            return {
                updateOne: {
                    filter: filter,
                    update: { $set: updateFields },
                    upsert: false
                }
            };
        });

        const result = await User.bulkWrite(bulkOps, { ordered: false });

        return res.status(200).json({
            success: true,
            message: "Bulk update completed.",
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount
        });

    } catch (error) {
        console.error("Error in bulkUpdateUsers:", error);
        return res.status(500).json({ success: false, message: "Internal server error during bulk update.", error: error.message || error });
    }
};

module.exports = {
    bulkInsertUsers,
    bulkUpdateUsers
};