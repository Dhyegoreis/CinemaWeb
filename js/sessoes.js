function listarSessoes() {
    const sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
    const filmes = JSON.parse(localStorage.getItem('filmes')) || [];
    const salas = JSON.parse(localStorage.getItem('salas')) || [];
    const lista = document.getElementById('listaSessoes');

    lista.innerHTML = '';

    if (sessoes.length === 0) {
        lista.innerHTML = '<p class="text-secondary">Nenhuma sessão disponível.</p>';
        return;
    }

    sessoes.forEach(function(sessao) {
        const filme = filmes.find(f => f.id == sessao.filmeId);
        const sala = salas.find(s => s.id == sessao.salaId);

        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';

        col.innerHTML = `
            <div class="card bg-secondary text-white h-100">
                <div class="card-body">
                    <h5 class="card-title text-warning">${filme ? filme.titulo : 'Filme removido'}</h5>
                    <p class="card-text mb-1"><strong>Sala:</strong> ${sala ? sala.nome : 'Sala removida'}</p>
                    <p class="card-text mb-1"><strong>Data/Hora:</strong> ${sessao.dataHora}</p>
                    <p class="card-text mb-1"><strong>Idioma:</strong> ${sessao.idioma}</p>
                    <p class="card-text mb-1"><strong>Formato:</strong> ${sessao.formato}</p>
                    <p class="card-text mb-3"><strong>Preço:</strong> R$ ${parseFloat(sessao.preco).toFixed(2)}</p>
                    <a href="venda-ingressos.html?sessaoId=${sessao.id}" class="btn btn-warning w-100">Comprar Ingresso</a>
                </div>
            </div>
        `;

        lista.appendChild(col);
    });
}

listarSessoes();
