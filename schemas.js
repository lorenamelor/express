 const pessoaSchema = {
    "type": "object",
    "properties": {
        "nome": {
            "type": "string",
            "description": "Nome da referida pessoa"
        },
        "email": {
            "type": "string",
            "description": "Endereço eletrônico da pessoa"
        },
        "telefone": {
            "type": "string",
            "description": "Telefone da pessoa"
        }
    },
    "required": [
        "nome",
        "email"
    ]
}

module.exports = {
    pessoaSchema
}