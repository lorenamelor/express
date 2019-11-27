Datastore = require('nedb');

const pessoasDB = new Datastore();

// Insere dados fictícios
obj1 = { "nome": "José da Silva", "email": "joses@gmail.com", "telefone": "3763-3837" };
obj2 = { "nome": "Maria Aguiar", "email": "maguiar@gmail.com", "telefone": "3984-3222" };
obj3 = { "nome": "Antonio Alves", "email": "aalves@gmail.com", "telefone": "4433-6678" };

function trataInsert(err, obj) { 
    if (!err) console.log (`Registro ${ obj._id } inserido`)
    else { console.log(`Erro ao inserir: ${ err.message }`) } 
};

pessoasDB.insert(obj1, trataInsert);
pessoasDB.insert(obj2, trataInsert);
pessoasDB.insert(obj3, trataInsert);

module.exports = {
    pessoasDB
}