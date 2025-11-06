import { useState } from 'react';

async function doSearch() {
    const [ano, setAno] = useState('');
    const [orgao, setOrgao] = useState('');
    const [results, setResults] = useState([]);
    const [lastSync, setLastSync] = useState(null);
    const url = `${api}/despesas?${params.toString()}`;

    if(orgao)params.append('orgao',orgao)
    if(ano)params.append('ano',ano);
    params.append('limit',100);

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
};


    return(
        <>
        {doSearch}
        <div className='campoPesquisa'>
            <div style="display:flex;gap:8px;align-items:center;">
                <input id="qOrgao" type="text" placeholder="Buscar órgão (ex: 'Saúde')" aria-label="Órgão"/>
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

export default doSearch; 