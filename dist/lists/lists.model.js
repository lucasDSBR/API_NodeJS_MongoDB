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
    },
    idPrincipal: {
        type: String
    },
    horaEntrouNalista: {
        type: String
    },
    userForaLimite: {
        type: Boolean
    },
    confirmIda: {
        type: Boolean
    },
    confirmVolta: {
        type: Boolean
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
    totalUsers: {
        type: Number
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
