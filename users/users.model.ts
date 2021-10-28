import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
    name: string,
    email: string,
    password: string,
    instituicao: string,
    curso: string,
    situacao: boolean,
    tipoUsuario: string

}
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

export const User = mongoose.model<User>('User', userSchema)