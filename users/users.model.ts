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

export class User {
    static findAll(): Promise<any[]> {
        return Promise.resolve(users);
    }

    static findById(id: string): Promise<any[]> {
        return new Promise(resolve =>{
            const filtred = users.filter(user => user.id === id)

            let user = undefined
            if(filtred.length > 0){
                user = filtred.shift()
            }
            resolve(user)

        })
    }
}