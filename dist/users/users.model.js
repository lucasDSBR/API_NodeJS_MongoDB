"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const environment_1 = require("../common/environment");
//Imformar o mongoos quais são os metadados de tal documento
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 80,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    instituicao: {
        type: String
    },
    cidade: {
        type: String
    },
    curso: {
        type: String
    },
    situacao: {
        type: Boolean
    },
    genero: {
        trype: String,
        required: false,
        enum: ['Male', 'Female']
    },
    profiles: {
        type: [String],
        required: false
    }
});
userSchema.statics.findByEmail = function (email, projection) {
    return this.findOne({ email }, projection);
};
userSchema.methods.hasAny = function (...profiles) {
    return profiles.some(profile => this.profile.indexOf(profile) !== -1);
};
userSchema.methods.matches = function (password) {
    return bcrypt.compareSync(password, this.password);
};
//cript password
const hashPassword = (obj, next) => {
    bcrypt.hash(obj.password, environment_1.environment.security.saltRounds)
        .then(hash => {
        obj.password = hash;
        next();
    }).catch(next);
};
const saveMeddleware = function (next) {
    const user = this;
    if (!user.isModified('password')) {
        next();
    }
    else {
        hashPassword(user, next);
    }
};
const updateMeddleware = function (next) {
    if (!this.getUpdate().password) {
        next();
    }
    else {
        hashPassword(this.getUpdate(), next);
    }
};
userSchema.pre('save', saveMeddleware);
userSchema.pre('findOneAndUpdate', updateMeddleware);
userSchema.pre('update', updateMeddleware);
//fim
exports.User = mongoose.model('User', userSchema);
