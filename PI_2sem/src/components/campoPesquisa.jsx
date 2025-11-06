import { useState } from 'react';
import "../styles/style.css";

const Search = async () => {
    const [ano, setAno] = useState('');
    const [orgao, setOrgao] = useState('');
    const [results, setResults] = useState([]);
    const [lastSync, setLastSync] = useState(null);
    const url = `${api}/despesas?${params.toString()}`;

    if (orgao) params.append('orgao', orgao)
    if (ano) params.append('ano', ano);
    params.append('limit', 100);

    try {
        const res = await fetch(url);
        const json = await res.json();
        const data = Array.isArray(json) ? json : json.data || [];
        const currentResults = data.map(normalizeItem);

        setResults(currentResults);
        setLastSync(new Date().toLocaleString());
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }


    const normalizeItem = (raw) => {
        return {
            id: raw.id || raw.codigo || Math.random(),
            orgao: raw.orgao || '',
            descricao: raw.descricao || '',
            valor: raw.valor || 0,
            ano: raw.ano || ''
        };
    }

    const renderResults = (list) => {
        resultsArea.innerHTML = '';
        let filtered = onlyFavorites.checked ? list.filter(it => favorites[it.id]) : list;
        if (!filtered.length) { resultsArea.innerHTML = '<div class="empty">Nenhum resultado encontrado.</div>'; return; }
        const table = document.createElement('table');
        table.innerHTML = '<thead><tr><th>Órgão</th><th>Descrição</th><th>Valor</th><th>Ano</th><th>Ações</th></tr></thead>';
        const tbody = document.createElement('tbody');
        filtered.forEach(it => {
            const isFav = !!favorites[it.id];
            const tr = document.createElement('tr');
            tr.innerHTML = `
        <td>${escapeHtml(it.orgao)}</td>
        <td class="small">${escapeHtml(shortText(it.descricao, 110))}</td>
        <td>${formatCurrency(it.valor)}</td>
        <td>${escapeHtml(it.ano)}</td>
        <td><button class="fav-btn ${isFav ? 'fav' : ''}" data-id="${it.id}">${isFav ? '★' : '☆'}</button></td>`;
            tbody.appendChild(tr);
        });
        table.appendChild(tbody); resultsArea.appendChild(table);
        resultsArea.querySelectorAll('.fav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id; const item = filtered.find(x => x.id == id);
                toggleFavorite(id, item);
            });
        });
    }

    const clearSearch = () => {
        qOrgao.value = ''; qAno.value = ''; onlyFavorites.checked = false;
        resultsArea.innerHTML = '<div class="empty">Nenhuma consulta realizada ainda.</div>'; totalCountEl.textContent = 0;
    }

    return (Search, normalizeItem, renderResults, clearSearch) => (
        <>
            {Search}
            <div className='campoPesquisa'>
                <div>
                    <input id="qOrgao" type="text" placeholder="Buscar órgão (ex: 'Saúde')" aria-label="Órgão" />
                    <select id="qAno" aria-label="Ano">
                        <option value="">Ano (todos)</option>
                    </select>
                    <button id="btnSearch">Buscar</button>
                    <button id="btnClear" class="secondary">Limpar</button>
                </div>
                <div class="small">Resultados: <span id="totalCount">0</span></div>
            </div>
        </>
    );
};

export default Search; 