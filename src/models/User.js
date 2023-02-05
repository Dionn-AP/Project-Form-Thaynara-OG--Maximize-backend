import { Schema } from "mongoose";
const mongoose = require("mongoose");

const User = new Schema({
    name: String,
    email: String,
    password: String
}, { timestamps: true });

export default mongoose.model('User', User);