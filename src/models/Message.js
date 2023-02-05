import { Schema } from "mongoose";
const mongoose = require("mongoose");

const Message = new Schema({
    sender_name: String,
    company: String,
    email: String,
    phone: String,
    sender_message: String,
    contact_refence: String,
    message_read: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Message', Message);