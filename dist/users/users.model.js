"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const users = [
    {
        id: "1",
        name: "lucas silva ",
        email: "lucassilva@gmail.com"
    },
    {
        id: "2",
        name: "tal tal",
        email: "taltal@gmail.com"
    }
];
class User {
    static findAll() {
        return Promise.resolve(users);
    }
    static findById(id) {
        return new Promise(resolve => {
            const filtred = users.filter(user => user.id === id);
            let user = undefined;
            if (filtred.length > 0) {
                user = filtred.shift();
            }
            resolve(user);
        });
    }
}
exports.User = User;
