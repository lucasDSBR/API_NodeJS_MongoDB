"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const reviewSchema = mongoose.Schema({
    data: {
        type: Date,
        required: true
    },
});
