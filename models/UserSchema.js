const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        min: 3
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    walletbalance: {
        type: Number,
        default: 0,
        min: 0
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    kycStatus: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
    deviceInfo: {
        ipAddress: {
            type: String,
        },
        deviceType: {
            type: String,
        },
        os: {
            type: String,
        },
    }
}, {
    timestamps: true,
});

UserSchema.index({ isBlocked: 1, createdAt: -1 });

const User = mongoose.model("User", UserSchema);

module.exports = User;