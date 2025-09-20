(function(){
  const API_BASE = 'https://api.exemplo.prefeitura.sp/sof-v4'; // ajuste aqui
  const qOrgao = document.getElementById('qOrgao');
  const qAno = document.getElementById('qAno');
  const btnSearch = document.getElementById('btnSearch');
  const btnClear = document.getElementById('btnClear');
  const resultsArea = document.getElementById('resultsArea');
  const totalCountEl = document.getElementById('totalCount');
  const favList = document.getElementById('favList');
  const onlyFavorites = document.getElementById('onlyFavorites');
  const lastSync = document.getElementById('lastSync');
  const toggleTheme = document.getElementById('toggleTheme');

  const LS_FAV_KEY = 'sof_favorites_v1';
  const LS_THEME_KEY = 'sof_theme_v1';

  let favorites = loadFavorites();
  let currentResults = [];

  populateYears();
  renderFavorites();
  applySavedTheme();

  btnSearch.addEventListener('click', doSearch);
  btnClear.addEventListener('click', clearSearch);
  onlyFavorites.addEventListener('change', () => renderResults(currentResults));
  toggleTheme.addEventListener('click', toggleThemeHandler);

  function formatCurrency(val){
    return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(val)||0);
  }
  function shortText(str,max=80){return str && str.length>max? str.slice(0,max-1)+'…':(str||'');}
  function escapeHtml(str){return str?String(str).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m])):'';}

  function applySavedTheme(){
    const saved = localStorage.getItem(LS_THEME_KEY)||'dark';
    document.documentElement.setAttribute('data-theme',saved);
    toggleTheme.textContent = saved==='light'?'Ir para Dark':'Ir para Light';
  }
  function toggleThemeHandler(){
    const current=document.documentElement.getAttribute('data-theme')==='light'?'light':'dark';
    const next=current==='light'?'dark':'light';
    document.documentElement.setAttribute('data-theme',next);
    localStorage.setItem(LS_THEME_KEY,next);
    toggleTheme.textContent=next==='light'?'Ir para Dark':'Ir para Light';
  }

  function populateYears(){
    const currentYear=new Date().getFullYear();
    for(let y=currentYear;y>=currentYear-10;y--){
      const opt=document.createElement('option');
      opt.value=y;opt.textContent=y;
      qAno.appendChild(opt);
    }
  }

  function loadFavorites(){try{return JSON.parse(localStorage.getItem(LS_FAV_KEY))||{};}catch{return {};}}
  function saveFavorites(){localStorage.setItem(LS_FAV_KEY,JSON.stringify(favorites));renderFavorites();}
  function toggleFavorite(key,item){favorites[key]?delete favorites[key]:favorites[key]=item;saveFavorites();renderResults(currentResults);}
  function renderFavorites(){
    favList.innerHTML='';
    const keys=Object.keys(favorites);
    if(keys.length===0){favList.innerHTML='<div class="empty">Nenhum favorito salvo.</div>';return;}
    const ul=document.createElement('div');
    ul.style.display='grid';ul.style.gap='8px';
    keys.forEach(k=>{
      const it=favorites[k];
      const div=document.createElement('div');
      div.style.display='flex';div.style.justifyContent='space-between';div.innerHTML=`
        <div><div style="font-weight:600">${shortText(it.orgao||'Órgão')}</div><div class="small">${shortText(it.descricao||'')}</div></div>
        <button class="fav-btn fav" data-key="${k}">★</button>`;
      ul.appendChild(div);
    });
    favList.appendChild(ul);
    favList.querySelectorAll('.fav-btn').forEach(btn=>btn.addEventListener('click',()=>toggleFavorite(btn.dataset.key)));
  }

  async function doSearch(){
    const orgao=qOrgao.value.trim();
    const ano=qAno.value.trim();
    const params=new URLSearchParams();
    if(orgao)params.append('orgao',orgao);
    if(ano)params.append('ano',ano);
    params.append('limit',100);
    const url=`${API_BASE}/despesas?${params}`;
    resultsArea.innerHTML='<div class="small">Carregando…</div>';
    try{
      const res=await fetch(url);
      const json=await res.json();
      const data=Array.isArray(json)?json:(json.data||[]);
      currentResults=data.map(normalizeItem);
      totalCountEl.textContent=currentResults.length;
      lastSync.textContent='Última consulta: '+new Date().toLocaleString();
      renderResults(currentResults);
    }catch(e){resultsArea.innerHTML=`<div class="empty">Erro: ${e.message}</div>`;}
  }

  function normalizeItem(raw){
    return {
      id: raw.id||raw.codigo||Math.random(),
      orgao: raw.orgao||'',
      descricao: raw.descricao||'',
      valor: raw.valor||0,
      ano: raw.ano||''
    };
  }

  function renderResults(list){
    resultsArea.innerHTML='';
    let filtered=onlyFavorites.checked?list.filter(it=>favorites[it.id]):list;
    if(!filtered.length){resultsArea.innerHTML='<div class="empty">Nenhum resultado encontrado.</div>';return;}
    const table=document.createElement('table');
    table.innerHTML='<thead><tr><th>Órgão</th><th>Descrição</th><th>Valor</th><th>Ano</th><th>Ações</th></tr></thead>';
    const tbody=document.createElement('tbody');
    filtered.forEach(it=>{
      const isFav=!!favorites[it.id];
      const tr=document.createElement('tr');
      tr.innerHTML=`
        <td>${escapeHtml(it.orgao)}</td>
        <td class="small">${escapeHtml(shortText(it.descricao,110))}</td>
        <td>${formatCurrency(it.valor)}</td>
        <td>${escapeHtml(it.ano)}</td>
        <td><button class="fav-btn ${isFav?'fav':''}" data-id="${it.id}">${isFav?'★':'☆'}</button></td>`;
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);resultsArea.appendChild(table);
    resultsArea.querySelectorAll('.fav-btn').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const id=btn.dataset.id;const item=filtered.find(x=>x.id==id);
        toggleFavorite(id,item);
      });
    });
  }

  function clearSearch(){
    qOrgao.value='';qAno.value='';onlyFavorites.checked=false;
    resultsArea.innerHTML='<div class="empty">Nenhuma consulta realizada ainda.</div>';totalCountEl.textContent=0;
  }

  window.__SOF_PROTOTYPE={doSearch,favorites};
})();