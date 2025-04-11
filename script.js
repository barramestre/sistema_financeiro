
//const { application } = require("express");


        async function CarregarTotal() {
            try{
                const resposta = await fetch("http://192.168.1.9:3000/totalemcaixa");
                const dados = await resposta.json();

                const total = dados.resultado;
                document.getElementById("emcaixa").innerText = `Disponivel: ${total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency:'BRL'
                })}`;

                const resp = await fetch("http://192.168.1.9:3000/somarentrada");
                const dados_01= await resp.json();

                const TotalEntrada = dados_01.resultado;
                document.getElementById("entrada").innerText = `Entrada: ${TotalEntrada.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency:'BRL'
                })}`;
            }catch(erro){

                console.error("Erro ao carregar o total:", erro);
                document.getElementById("total").innerText="Erro ao carregar total.";

            }
        }
        CarregarTotal();

async function carregarsaida() {
    try{
                const res = await fetch("http://192.168.1.9:3000/somarsaidas");
                const dados_03 = await res.json();

                const total_03 = dados_03.resultado;
                document.getElementById("saida").innerText = `Saída: ${total_03.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency:'BRL'
                })}`;
                
            }catch(erro){

                console.error("Erro ao carregar o total:", erro);
                document.getElementById("saida").innerText="Erro ao carregar total.";

            }
    
}

carregarsaida()


// Funções para carregar as lista de lanaçamento

      //Função para formata a data
        function formataData(dataIso){
            const data = new Date(dataIso);
            return data.toDateString('pt-BR');
        }
// Função para formatar valores em reais
        function formatarValor(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

        

       async function buscarDados() {

try {
    const resposta = await fetch('http\://192.168.1.9:3000/pegauselance');
    const dados = await resposta.json();
    exibirDados(dados.resultado)
    
} catch (erro) {
    console.error('Erro ao buscar transações', erro);
}
console.log(dados.resultado)
}


// Função para exibir os dados da tabela
function exibirDados(transacoes){
    const tabela = document.getElementById('tabela-dados');
    tabela.innerHTML="";
    transacoes.reverse();

    transacoes.forEach(item => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
        <td>${formataData(item.dataLancada)}</td>
        <td>${item.descricao}</td>
        <td>${formatarValor(item.valor)}</td>
        <td class="${item.entrada ? 'entrada' : 'saida'}">
            ${item.entrada ? 'Entrada' : 'Saída'}
        </td>
        <td>${item.autor.name}</td>
        <td><button onclick="excluirTransacao(${item.id})">Excluir</button></td>
    `;

        tabela.appendChild(linha);
    });
}


//aqui é aparte para adiconar as entradas com um formulário

const form = document.getElementById("form-transacao");
form.addEventListener("submit", async (e)=> {
    e.preventDefault();

const descricao=document.getElementById("descricao").value;
const valor=document.getElementById("valor").value;
const tipo=document.getElementById("tipo").value;

const dados={
    descricao,
    valor,
    tipo
};

try {


const response = await fetch("http://192.168.1.9:3000/lancamento",{
method: "POST",

headers:{
    "Content-type": "application/json"
},

body:JSON.stringify(dados)

});

if (response.ok){
    //alert("Transação salva com sucesso");
    form.reset();
    CarregarTotal();
    carregarsaida();
    buscarDados();

}else{
    alert("Erro ao salvar transação");
}

} catch (error) {
    console.error("Erro ao salvar transação", error);    
}

});

document.addEventListener("DOMContentLoaded", buscarDados);

// Aqui vamos deletra os registro de lançamento pelo id

    
    
async function excluirTransacao(id) {
    const confirmar = confirm("Tem certeza que deseja excluir?");
    if (!confirmar) return;

    try {
        const resposta = await fetch("http://192.168.1.9:3000/deletarlancamento", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        });

        if (resposta.ok) {
            alert("Transação excluída com sucesso!");
            CarregarTotal();
            carregarsaida();
            buscarDados();
        } else {
            alert("Erro ao excluir transação");
        }
    } catch (erro) {
        console.error("Erro ao excluir transação:", erro);
    }
}


function formataData(dataIso) {
    const data = new Date(dataIso);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  async function buscarEntradas() {
    try {
        const resposta = await fetch("http://192.168.1.9:3000/listarporentrada");
        const dados = await resposta.json();
        exibirDados(dados.resultado);
    } catch (erro) {
        console.error("Erro ao buscar entradas:", erro);
    }
}

async function buscarSaidas() {
    try {
        const resposta = await fetch("http://192.168.1.9:3000/listarporsaida");
        const dados = await resposta.json();
        exibirDados(dados.resultado);
    } catch (erro) {
        console.error("Erro ao buscar saídas:", erro);
    }
}


const botoesFiltro = document.querySelectorAll(".aba");

function ativarBotao(botaoClicado) {
  botoesFiltro.forEach(btn => btn.classList.remove("ativa"));
  botaoClicado.classList.add("ativa");
}

document.querySelectorAll(".aba").forEach(btn => {
  btn.addEventListener("click", function () {
    ativarBotao(this);
  });
});
