'use strict';
import mongoose from "mongoose";

const registreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
       
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

export const user =mongoose.models?.user || mongoose.model("user", registreSchema)

