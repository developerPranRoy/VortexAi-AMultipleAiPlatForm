import mongoose from "mongoose";
import strict from "node:assert/strict";
import { timeStamp } from "node:console";
import { type } from "node:os";

const userSchema = mongoose.Schema({
    firebaseUid: {
        type: String,
        unique: true
    },
    name: String,
    email: String,
    avatar: String

}, {
    timeStamp: true
})

const User = mongoose.model("User", userSchema)

export default User