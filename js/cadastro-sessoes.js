let idEditando = null;

// Carrega os filmes do localStorage e popula o select
function carregarFilmes() {
    const filmes = JSON.parse(localStorage.getItem('filmes')) || [];
    const select = document.getElementById('filmeId');

    // Remove opções antigas exceto a primeira ("Selecione o filme")
    select.length = 1;

    filmes.forEach(function(filme) {
        const option = document.createElement('option');
        option.value = filme.id;
        option.textContent = filme.titulo;
        select.appendChild(option);
    });
}

// Carrega as salas do localStorage e popula o select
function carregarSalas() {
    const salas = JSON.parse(localStorage.getItem('salas')) || [];
    const select = document.getElementById('salaId');

    // Remove opções antigas exceto a primeira ("Selecione a sala")
    select.length = 1;

    salas.forEach(function(sala) {
        const option = document.createElement('option');
        option.value = sala.id;
        option.textContent = sala.nome + ' (' + sala.tipo + ')';
        select.appendChild(option);
    });
}

function listarSessoes() {
    const sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
    const filmes = JSON.parse(localStorage.getItem('filmes')) || [];
    const salas = JSON.parse(localStorage.getItem('salas')) || [];
    const tbody = document.getElementById('tabelaSessoes');

    tbody.innerHTML = '';

    sessoes.forEach(function(sessao) {
        // Busca o nome do filme e da sala pelo id
        const filme = filmes.find(f => f.id == sessao.filmeId);
        const sala = salas.find(s => s.id == sessao.salaId);

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${filme ? filme.titulo : 'Filme removido'}</td>
            <td>${sala ? sala.nome : 'Sala removida'}</td>
            <td>${sessao.dataHora}</td>
            <td>R$ ${parseFloat(sessao.preco).toFixed(2)}</td>
            <td>${sessao.idioma}</td>
            <td>${sessao.formato}</td>
            <td>
                <button class="btn btn-sm btn-outline-warning me-1" onclick="editarSessao(${sessao.id})">Editar</button>
                <button class="btn btn-sm btn-outline-danger" onclick="deletarSessao(${sessao.id})">Deletar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function deletarSessao(id) {
    let sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
    sessoes = sessoes.filter(function(sessao) {
        return sessao.id !== id;
    });
    localStorage.setItem('sessoes', JSON.stringify(sessoes));
    listarSessoes();
}

function editarSessao(id) {
    const sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
    const sessao = sessoes.find(function(s) {
        return s.id === id;
    });

    if (!sessao) return;

    document.getElementById('filmeId').value = sessao.filmeId;
    document.getElementById('salaId').value = sessao.salaId;
    document.getElementById('dataHora').value = sessao.dataHora;
    document.getElementById('preco').value = sessao.preco;
    document.getElementById('idioma').value = sessao.idioma;
    document.getElementById('formato').value = sessao.formato;

    idEditando = sessao.id;
    document.querySelector('#formSessao button[type="submit"]').textContent = 'Atualizar Sessão';
}

document.getElementById('formSessao').addEventListener('submit', function(event) {
    event.preventDefault();

    let sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];

    if (idEditando !== null) {
        sessoes = sessoes.map(function(sessao) {
            if (sessao.id === idEditando) {
                return {
                    id: idEditando,
                    filmeId: document.getElementById('filmeId').value,
                    salaId: document.getElementById('salaId').value,
                    dataHora: document.getElementById('dataHora').value,
                    preco: document.getElementById('preco').value,
                    idioma: document.getElementById('idioma').value,
                    formato: document.getElementById('formato').value
                };
            }
            return sessao;
        });

        idEditando = null;
        document.querySelector('#formSessao button[type="submit"]').textContent = 'Salvar Sessão';

    } else {
        const sessao = {
            id: Date.now(),
            filmeId: document.getElementById('filmeId').value,
            salaId: document.getElementById('salaId').value,
            dataHora: document.getElementById('dataHora').value,
            preco: document.getElementById('preco').value,
            idioma: document.getElementById('idioma').value,
            formato: document.getElementById('formato').value
        };
        sessoes.push(sessao);
    }

    localStorage.setItem('sessoes', JSON.stringify(sessoes));
    document.getElementById('formSessao').reset();
    listarSessoes();
});

// Inicializa a página
carregarFilmes();
carregarSalas();
listarSessoes();
