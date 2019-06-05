// declara um conjunto fake de dados para contatos
var receitasfake = {
    "dadosReceitas": [
         {
            "id": 1,
            "categoria": "Aluguel",
            "mes": "Jan/2019",
            "valor": "850",
        },
        {
            "id": 2,
            "categoria": "Vendas",
            "mes": "Fev/2019",
            "valor": "540",
        } 
    ]
}

// Caso exista no Local Storage, recupera os dados salvos
var receitas = JSON.parse(localStorage.getItem('receitas'));
if (!receitas) {
    receitas = receitasfake
};

// Exibe mensagem em um elemento de ID msg
function displayMessage(msg) {
    $('#msg').html('<div class="alert alert-warning">' + msg + '</div>');
}

function insertContato(contato) {
    // Calcula novo Id a partir do último código existente no array
    let novoId;
    if (receitas.dadosReceitas.length == 0)
        novoId = 1
    else
      novoId = receitas.dadosReceitas[receitas.dadosReceitas.length - 1].id + 1;
    let novoContato = {
        "id": novoId,
        "categoria": contato.categoria,
        "mes": contato.mes,
        "valor": contato.valor,
    };

    // Insere o novo objeto no array
    receitas.dadosReceitas.push(novoContato);
    displayMessage("Contato inserido com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('receitas', JSON.stringify(receitas));
}

function updateContato(id, contato) {
    // Localiza o indice do objeto a ser alterado no array a partir do seu ID
    let index = receitas.dadosReceitas.map(obj => obj.id).indexOf(id);

    // Altera os dados do objeto no array
    receitas.dadosReceitas[index].categoria = contato.categoria,
        receitas.dadosReceitas[index].mes = contato.mes,
        receitas.dadosReceitas[index].valor = contato.valor,

    displayMessage("Contato alterado com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('receitas', JSON.stringify(receitas));
}

function deleteContato(id) {    
    // Filtra o array removendo o elemento com o id passado
    receitas.dadosReceitas = receitas.dadosReceitas.filter(function (element) { return element.id != id });

    displayMessage("Contato removido com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('receitas', JSON.stringify(receitas));
}