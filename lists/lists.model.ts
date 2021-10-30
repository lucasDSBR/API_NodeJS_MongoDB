import * as mongoose from 'mongoose';


export interface UsersItem extends mongoose.Document {
    name: string,
    vai: boolean,
    volta: boolean,
    situacao: boolean
}

export interface Lists extends mongoose.Document {
    name: string;
    dataIda: Date;
    dataVolta: Date;
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
    }
})

const listsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dataIda: {
        type: Date,
        required: true
    },
    dataVolta: {
        type: Date,
        required: true
    },
    users: {
        type: [UserlistSchema],
        required: false,
        select: false,
        default: []
    },
    situacao: {
        type: Boolean,
        required: true
    }
})

export const Lists = mongoose.model<Lists>('Lists', listsSchema)