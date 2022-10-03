const form = document.getElementById("novoItem")
const list = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem('Itens')) || []

itens.forEach ((element)=> {
    createItem(element)
})


    form.addEventListener("submit", (event) => {
        event.preventDefault()

        const nome = event.target.elements['nome']
        const quantidade = event.target.elements['quantidade']
        const existe = itens.find(element => element.nome === nome.value)
        
        const itemAtual = {
            'nome': nome.value,
            'quantidade': quantidade.value
        }

        if (existe) {
            itemAtual.id = existe.id
            atualizaElementos(itemAtual)
            itens[itens.indexOf(existe)] = itemAtual

        } else {
            itemAtual.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0
            createItem (itemAtual)
            itens.push(itemAtual)
        }

        nome.value = ""
        quantidade.value = ""

        localStorage.setItem('Itens', JSON.stringify(itens))
    })

    function createItem(item) {
        const li = document.createElement("li");
        const negrito = document.createElement("strong");
        
        li.classList.add("item");

        negrito.innerHTML = item.quantidade
        negrito.dataset.id = item.id

        li.appendChild(negrito);

        li.innerHTML += item.nome

        li.appendChild(createButton (item.id))

        list.appendChild(li)
    
    }

    function atualizaElementos (itemAtual) {
        document.querySelector("[data-id='"+itemAtual.id+"']").innerHTML = itemAtual.quantidade
    }

    function createButton (id) {
        var button = document.createElement('button');
        button.innerHTML = 'X';

        button.addEventListener ('click', function () {
            deleteElement (this.parentNode, id)
        })

        return button;
    }

    function deleteElement (parentNode, id) {
        parentNode.remove();
        itens.splice(itens.findIndex(element => element.id === id), 1)
        localStorage.setItem('Itens', JSON.stringify(itens))
    }