import * as mongoose from 'mongoose';


export interface UsersItem extends mongoose.Document {
    name: string,
    vai: boolean,
    volta: boolean,
    idPrincipal: string,
    situacao: boolean
}

export interface Lists extends mongoose.Document {
    name: string;
    dataIda: string;
    dataVolta: string;
    totalUsers: number;
    users: UsersItem[];
    situacao: boolean;
}


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
    idPrincipal:{
        type: String
    },
    horaEntrouNalista: {
        type: String
    },
    userForaLimite:{
        type: Boolean
    },
    confirmIda:{
        type: Boolean
    },
    confirmVolta:{
        type: Boolean
    }
})

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
})

export const Lists = mongoose.model<Lists>('Lists', listsSchema)