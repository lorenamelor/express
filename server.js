const http = require('http');
const bodyParser = require('body-parser');
const jsonSchema = require('jsonschema');
const db = require('./db.js');
const pessoaSchema = require('./schemas.js');

//importa o módulo express
const express = require('express');
//cria uma aplicação express
const app = express();

//análise do req.body e rq.params
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//rotas

app.get('/pessoas', listaPessoas);
app.post('/pessoas', inserePessoas);
app.put('/pessoas/:id', alteraPessoas);
app.delete('/pessoas/:id', deletePessoas);

function listaPessoas(req, res) {
    db.pessoasDB.find({}, function (err, lista) {
        if (!err) {
            res.json(lista);
        }
        else {
            res.status(400).send(err.message);
        }
    })
}

function inserePessoas(req, res) {
    //Validação do documento JSON recebido
    var result = jsonSchema.validate(req.body, pessoaSchema);

    if (result.errors.length > 0) {
        res.status(400).send('Erro no formato do objeto JSON');
    }
    else {
        db.pessoasDB.insert(req.body, (err) => {
            if (!err) {
                res.status(200).send('Pessoa adicionada')
            }
            else {
                res.status(400).send(err.message);
            }
        })
    }

}

function alteraPessoas(req, res) {
    var result = jsonSchema.validate(req.body, pessoaSchema);

    if (result.errors.length > 0) {
        res.status(400).send('Erro no formato do objeto JSON');
    }
    else {
        db.pessoasDB.update({ _id: req.params.id }, { $set: req.body }, {}, (err, newOnj) => {
            if (!err) {
                res.status(200).send('Pessoa Editada')
            }
            else {
                res.status(400).send(err.message);
            }
        })
    }

}

function deletePessoas(req, res) {
    db.pessoasDB.remove({ _id: req.params.id }, {}, function (err) {
        if (!err) {
            res.status(200).send('Pessoa deletada')
        }
        else {
            res.status(400).send(err.message);
        }
    })
}



// Iniciar o servidor
const porta = 5551;
http.createServer(app).listen(porta, () =>
    console.log(`Servidor pronto na porta ${porta}`));