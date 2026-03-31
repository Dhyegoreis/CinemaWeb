let idEditando = null;

function listarSalas() {
    const salas = JSON.parse(localStorage.getItem('salas')) || [];
    const tbody = document.getElementById('tabelaSalas');

    tbody.innerHTML = '';

    salas.forEach(function(sala) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${sala.nome}</td>
            <td>${sala.capacidade}</td>
            <td>${sala.tipo}</td>
            <td>
                <button class="btn btn-sm btn-outline-warning me-1" onclick="editarSala(${sala.id})">Editar</button>
                <button class="btn btn-sm btn-outline-danger" onclick="deletarSala(${sala.id})">Deletar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function deletarSala(id) {
    let salas = JSON.parse(localStorage.getItem('salas')) || [];
    salas = salas.filter(function(sala) {
        return sala.id !== id;
    });
    localStorage.setItem('salas', JSON.stringify(salas));
    listarSalas();
}

function editarSala(id) {
    const salas = JSON.parse(localStorage.getItem('salas')) || [];
    const sala = salas.find(function(s) {
        return s.id === id;
    });

    if (!sala) return;

    document.getElementById('nomeSala').value = sala.nome;
    document.getElementById('capacidade').value = sala.capacidade;
    document.getElementById('tipo').value = sala.tipo;

    idEditando = sala.id;
    document.querySelector('#formSala button[type="submit"]').textContent = 'Atualizar Sala';
}

document.getElementById('formSala').addEventListener('submit', function(event) {
    event.preventDefault();

    let salas = JSON.parse(localStorage.getItem('salas')) || [];

    if (idEditando !== null) {
        salas = salas.map(function(sala) {
            if (sala.id === idEditando) {
                return {
                    id: idEditando,
                    nome: document.getElementById('nomeSala').value,
                    capacidade: document.getElementById('capacidade').value,
                    tipo: document.getElementById('tipo').value
                };
            }
            return sala;
        });

        idEditando = null;
        document.querySelector('#formSala button[type="submit"]').textContent = 'Salvar Sala';

    } else {
        const sala = {
            id: Date.now(),
            nome: document.getElementById('nomeSala').value,
            capacidade: document.getElementById('capacidade').value,
            tipo: document.getElementById('tipo').value
        };
        salas.push(sala);
    }

    localStorage.setItem('salas', JSON.stringify(salas));
    document.getElementById('formSala').reset();
    listarSalas();
});

listarSalas();
