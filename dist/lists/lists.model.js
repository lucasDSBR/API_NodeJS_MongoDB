"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lists = void 0;
const mongoose = require("mongoose");
const UserlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    vai: {
        type: Boolean,
        required: true
    },
    volta: {
        type: Boolean,
        required: true
    },
    situacao: {
        type: Boolean,
        required: true
    }
});
const listsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dataIda: {
        type: String
    },
    dataVolta: {
        type: String
    },
    users: {
        type: [UserlistSchema],
        required: false,
        default: []
    },
    situacao: {
        type: Boolean,
        required: true
    }
});
exports.Lists = mongoose.model('Lists', listsSchema);