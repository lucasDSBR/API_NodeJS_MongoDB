"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose = require("mongoose");
//Imformar o mongoos quais são os metadados de tal documento
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        select: false
    },
    instituicao: {
        type: String
    },
    curso: {
        type: String
    },
    situacao: {
        type: Boolean
    },
    tipoUsuario: {
        type: String
    }
});
//fim
exports.User = mongoose.model('User', userSchema);
