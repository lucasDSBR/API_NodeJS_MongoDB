# API_NodeJS_MongoDB


Restify, NodeJs e MongoDB



## MongoDB commands
user.<nome-do-banco>
var teste = {nome: "teste", email:"teste"}
db.<nome-da-collection>.insert(teste)


### Search
- Busca por id:
    - db.[nome-da-collection].find({_id:ObjectId("617ae03c390a0a31bac48a33")})
- Busca geral:
    - db.[nome-da-collection].find()
- Busca primeiro objeto de uma "lista":
    - db.[nome-da-collection].findOne()

### Update
- Com referencia ao objeto:
    1. var [nome-do-objeto] = db.[nome-da-collection].findOne()
    2. [nome-do-objeto>.nome = "filano"
    3. db.[nome-da-collection].update({_id: [nome-do-objeto]._id}, [nome-do-objeto>)
    - Outra forma de se usar o item 3:
        1. db.[nome-da-collection].update({_id: [nome-do-objeto]._id}, {"$set": {name: "nome desejado"}})
### Deleter/Remove

- Com referencia ao nome incluso no objeto:
    1. db.[nome-da-collection].remove({name: "nome que deseja"})