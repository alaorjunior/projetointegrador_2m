import { useState } from 'react';

async function doSearch() {
    const [ano, setAno] = useState('');
    const [orgao, setOrgao] = useState('');
    const [results, setResults] = useState([]);
    const [lastSync, setLastSync] = useState(null);

    if(orgao)params.append('orgao',orgao)
    if(ano)params.append('ano',ano);
        params.append('limit',100);

    try{
        currentResults=data.map(normalizeItem);
        totalCountEl.textContent=currentResults.length;
        lastSync.textContent='Última consulta: '+new Date().toLocaleString();
        renderResults(currentResults);
    }catch (e){resultsArea.innerHTML};
}

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