// ID do filme sendo editado (null = novo cadastro)
let idEditando = null;

function listarFilmes() {
    const filmes = JSON.parse(localStorage.getItem('filmes')) || [];
    const tbody = document.getElementById('tabelaFilmes');

    tbody.innerHTML = '';

    filmes.forEach(function(filme) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${filme.titulo}</td>
            <td>${filme.genero}</td>
            <td>${filme.classificacao}</td>
            <td>${filme.duracao} min</td>
            <td>${filme.dataEstreia}</td>
            <td>
                <button class="btn btn-sm btn-outline-warning me-1" onclick="editarFilme(${filme.id})">Editar</button>
                <button class="btn btn-sm btn-outline-danger" onclick="deletarFilme(${filme.id})">Deletar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function deletarFilme(id) {
    let filmes = JSON.parse(localStorage.getItem('filmes')) || [];

    // Remove o filme com o id correspondente
    filmes = filmes.filter(function(filme) {
        return filme.id !== id;
    });

    localStorage.setItem('filmes', JSON.stringify(filmes));
    listarFilmes();
}

function editarFilme(id) {
    const filmes = JSON.parse(localStorage.getItem('filmes')) || [];

    // Busca o filme pelo id
    const filme = filmes.find(function(f) {
        return f.id === id;
    });

    if (!filme) return;

    // Preenche o formulário com os dados do filme
    document.getElementById('titulo').value = filme.titulo;
    document.getElementById('genero').value = filme.genero;
    document.getElementById('descricao').value = filme.descricao;
    document.getElementById('classificacao').value = filme.classificacao;
    document.getElementById('duracao').value = filme.duracao;
    document.getElementById('dataEstreia').value = filme.dataEstreia;

    // Guarda o id do filme sendo editado e muda o botão
    idEditando = filme.id;
    document.querySelector('#formFilme button[type="submit"]').textContent = 'Atualizar Filme';
}

document.getElementById('formFilme').addEventListener('submit', function(event) {
    event.preventDefault();

    let filmes = JSON.parse(localStorage.getItem('filmes')) || [];

    if (idEditando !== null) {
        // Atualiza o filme existente
        filmes = filmes.map(function(filme) {
            if (filme.id === idEditando) {
                return {
                    id: idEditando,
                    titulo: document.getElementById('titulo').value,
                    genero: document.getElementById('genero').value,
                    descricao: document.getElementById('descricao').value,
                    classificacao: document.getElementById('classificacao').value,
                    duracao: document.getElementById('duracao').value,
                    dataEstreia: document.getElementById('dataEstreia').value
                };
            }
            return filme;
        });

        idEditando = null;
        document.querySelector('#formFilme button[type="submit"]').textContent = 'Salvar Filme';

    } else {
        // Cadastra novo filme
        const filme = {
            id: Date.now(),
            titulo: document.getElementById('titulo').value,
            genero: document.getElementById('genero').value,
            descricao: document.getElementById('descricao').value,
            classificacao: document.getElementById('classificacao').value,
            duracao: document.getElementById('duracao').value,
            dataEstreia: document.getElementById('dataEstreia').value
        };
        filmes.push(filme);
    }

    localStorage.setItem('filmes', JSON.stringify(filmes));
    document.getElementById('formFilme').reset();
    listarFilmes();
});

listarFilmes();
