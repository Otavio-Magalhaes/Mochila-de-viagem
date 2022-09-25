const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];


// Uso do forEach para que todos os itens já escritos na lista sejam mantidos ao atualizar a página 
itens.forEach((elemento)=>{
    criaElemento(elemento);
});


form.addEventListener("submit",(evento)=>{
    evento.preventDefault()
    let nome = evento.target.elements["nome"];
    let quantidade = evento.target.elements["quantidade"];

    const existe = itens.find( elemento => elemento.nome === nome.value )
    
    const itemAtual ={
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
    
        itemAtual.id = existe.id        
        
        atualizaElemento(itemAtual)

        
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual    
    } else {

        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0; 
    
        criaElemento(itemAtual);
    
        itens.push(itemAtual);
    
    }



    //por o localStorage so aceitar String com paramemtro, nao é possivel passar o objeto ItemAtual como parametro de valor dentro do setItem, por isso temos que usar o JSON.stringify(itemAtual), assim transformando o objeto como string e podendo utiliza-lo
    localStorage.setItem("itens", JSON.stringify(itens));



    nome.value = "";
    quantidade.value = "";


});


function criaElemento(item){

    //cria a tag li 
    const novoItem = document.createElement('li');

    //adiciona a classe "item" dentro da li criada acima
    novoItem.classList.add("item");

    //cria a tag strong 
    const numeroItem = document.createElement("strong");

    //atribui dentro da tag strong o valor recebido pela quantidade
    numeroItem.innerHTML = item.quantidade;


    //criar um id para poder atualizar os elementos quando forem reescritos na tela do navegador
    numeroItem.dataset.id = item.id;

    //coloca a tag strong como filha da li, ou seja, a tag strong dentro da li com somente a quantidade dentro da strong
    novoItem.appendChild(numeroItem);

    //logo apos o fechamento da tag strong é atribuido o nome recebido pelo parametro: "nome";
    novoItem.innerHTML += item.nome;


    //colocando o botao como filho do elemento criado, esta chamando a função que realmente cria o botao
    novoItem.appendChild(botaoDeleta(item.id));

    //atribui o novoItem como filho da lista, ou seja, toda a li criada com todo seu conteudo fica dentro da ul da lista;
    lista.appendChild(novoItem);
}


function atualizaElemento(item) {
    document.querySelector(`[data-id= '${item.id}']`).innerHTML = item.quantidade;
}


function botaoDeleta(id){
    const elementoBotao = document.createElement("button");

    elementoBotao.addEventListener("click", function () {

        RemoveElemento(this.parentNode,id);
    })

    elementoBotao.innerHTML = "X";

    return elementoBotao;
}

function RemoveElemento(tag, id){
    tag.remove();
    
    itens.splice(itens.findIndex(elemento => elemento.id === id) ,1);

    localStorage.setItem("itens", JSON.stringify(itens))
}