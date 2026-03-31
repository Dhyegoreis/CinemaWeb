// Carrega sessões do localStorage e popula o select
// Exibe: título do filme + data/hora para o usuário identificar a sessão
function carregarSessoes() {
    const sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
    const filmes = JSON.parse(localStorage.getItem('filmes')) || [];
    const select = document.getElementById('sessaoId');

    select.length = 1;

    sessoes.forEach(function(sessao) {
        const filme = filmes.find(f => f.id == sessao.filmeId);
        const option = document.createElement('option');
        option.value = sessao.id;
        option.textContent = (filme ? filme.titulo : 'Filme removido') + ' — ' + sessao.dataHora;
        select.appendChild(option);
    });
}

function listarIngressos() {
    const ingressos = JSON.parse(localStorage.getItem('ingressos')) || [];
    const sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
    const filmes = JSON.parse(localStorage.getItem('filmes')) || [];
    const tbody = document.getElementById('tabelaIngressos');

    tbody.innerHTML = '';

    ingressos.forEach(function(ingresso) {
        const sessao = sessoes.find(s => s.id == ingresso.sessaoId);
        const filme = sessao ? filmes.find(f => f.id == sessao.filmeId) : null;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${filme ? filme.titulo : 'Sessão removida'} ${sessao ? '— ' + sessao.dataHora : ''}</td>
            <td>${ingresso.nomeCliente}</td>
            <td>${ingresso.cpf}</td>
            <td>${ingresso.assento}</td>
            <td>${ingresso.tipoPagamento}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger" onclick="deletarIngresso(${ingresso.id})">Cancelar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function deletarIngresso(id) {
    let ingressos = JSON.parse(localStorage.getItem('ingressos')) || [];
    ingressos = ingressos.filter(function(ingresso) {
        return ingresso.id !== id;
    });
    localStorage.setItem('ingressos', JSON.stringify(ingressos));
    listarIngressos();
}

document.getElementById('formIngresso').addEventListener('submit', function(event) {
    event.preventDefault();

    const ingresso = {
        id: Date.now(),
        sessaoId: document.getElementById('sessaoId').value,
        nomeCliente: document.getElementById('nomeCliente').value,
        cpf: document.getElementById('cpf').value,
        assento: document.getElementById('assento').value,
        tipoPagamento: document.getElementById('tipoPagamento').value
    };

    const ingressos = JSON.parse(localStorage.getItem('ingressos')) || [];
    ingressos.push(ingresso);
    localStorage.setItem('ingressos', JSON.stringify(ingressos));

    document.getElementById('formIngresso').reset();
    listarIngressos();
});

// Verifica se veio redirecionado da página de programação com sessão pré-selecionada
// sessoes.html passa o id da sessão via URL: venda-ingressos.html?sessaoId=123
const params = new URLSearchParams(window.location.search);
const sessaoParam = params.get('sessaoId');

carregarSessoes();

if (sessaoParam) {
    document.getElementById('sessaoId').value = sessaoParam;
}

listarIngressos();
