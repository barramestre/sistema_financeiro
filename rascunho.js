async function buscarDescricoes() {
    try {
        const response = await fetch("http://localhost:3000/pegauselance"); // Ajuste a URL do seu backend
        if (!response.ok) {
            throw new Error("Erro ao buscar lançamentos");
        }
        const data = await response.json();
        mostrarDescricoes(data.resultado);
    } catch (error) {
        console.error("Erro:", error);
    }
}

function mostrarDescricoes(listaLancamentos) {
    const lista = document.getElementById("lista-descricoes");
    lista.innerHTML = ""; // Limpa a lista antes de adicionar novos dados

    const valor = document.getElementById("valor");
    lista.innerHTML = ""; // Limpa a lista antes de adicionar novos dados

    listaLancamentos.forEach(lancamento => {
        const li = document.createElement("li");
        li.textContent = lancamento.descricao;
        lista.appendChild(li);

        const li2 = document.createElement("li");
        li2.textContent = lancamento.valor;
        valor.appendChild(li2);


    });
}

// Chama a função ao carregar a página
buscarDescricoes();