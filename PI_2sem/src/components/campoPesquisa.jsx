import { useEffect, useState } from "react";
import "../styles/style.css";

const TabelaDespesas = () => {
  const LS_FAV_KEY = "sof_favoritos_v1";

  const [dados, setDados] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [favoritos, setFavoritos] = useState({});

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(LS_FAV_KEY)) || {};
      setFavoritos(stored);
    } catch {
      setFavoritos({});
    }
  }, []);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const res = await fetch("/assets/resultado.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`Erro HTTP ${res.status}`);
        const data = await res.json();

        const lista = data.map((item) => {
          const org = item.orgao || {};
          const despesas = Array.isArray(item.despesas) ? item.despesas : [];
          const empenhos = Array.isArray(item.empenhos) ? item.empenhos : [];

          const codOrgao = org.codOrgao || "(sem código)";
          const nomeOrgao = org.txtDescricaoOrgao || item.descricao || "(sem nome)";

          const totalDespesas = despesas.reduce((soma, d) => {
            const val = parseFloat(d.valLiquidado) || 0;
            return soma + val;
          }, 0);

          const qtdEmpenhos = empenhos.length;

          return {
            id: `${codOrgao}-${nomeOrgao}`,
            codOrgao,
            orgao: nomeOrgao,
            valorTotal: totalDespesas,
            qtdEmpenhos,
          };
        });

        const agrupado = lista.reduce((acc, item) => {
          const chave = `${item.codOrgao}-${item.orgao}`.toLowerCase().trim();
          if (!acc[chave]) {
            acc[chave] = { id: chave, codOrgao: item.codOrgao, orgao: item.orgao, valorTotal: 0, qtdEmpenhos: 0 };
          }
          acc[chave].valorTotal += item.valorTotal;
          acc[chave].qtdEmpenhos += item.qtdEmpenhos;
          return acc;
        }, {});

        setDados(Object.values(agrupado));
        setErro(null);
      } catch (e) {
        console.error(e);
        setErro("Erro ao carregar dados: " + e.message);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, []);

  const salvarFavoritos = (novos) => {
    setFavoritos(novos);
    localStorage.setItem(LS_FAV_KEY, JSON.stringify(novos));
  };

  const alternarFavorito = (item) => {
    const novos = { ...favoritos };
    if (novos[item.id]) delete novos[item.id];
    else novos[item.id] = item;
    salvarFavoritos(novos);
  };

  const formatarMoeda = (valor) =>
    isNaN(valor) ? "—" : valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  if (carregando) return <div className="loading" role="status" aria-live="polite">Carregando dados...</div>;
  if (erro) return <div role="alert">{erro}</div>;
  if (!dados.length) return <div className="empty" role="status">Nenhum dado encontrado.</div>;

  const favoritosArray = Object.values(favoritos);
  const totalEmpenhos = dados.reduce((s, it) => s + it.qtdEmpenhos, 0);
  const totalGeral = dados.reduce((s, it) => s + it.valorTotal, 0);

  return (
    <section className="main-container" aria-labelledby="tabela-title">
      <section className="tabela-container" aria-labelledby="tabela-title">
        <h2 id="tabela-title">Despesas por Órgão</h2>
        <p className="small">
          Total de órgãos listados: <strong>{dados.length}</strong> {" | "}
          Total de empenhos: <strong>{totalEmpenhos}</strong> {" | "}
          Total geral de despesas: <strong>{formatarMoeda(totalGeral)}</strong>
        </p>

        <div className="table-wrapper" role="region" aria-label="Tabela de despesas por órgão">
          <table className="tabela-despesas">
            <caption className="small">Tabela resumida de despesas consolidadas por órgão</caption>
            <thead>
              <tr>
                <th scope="col">Órgão</th>
                <th scope="col">Total de Despesas</th>
                <th scope="col">Qtd. de Empenhos</th>
                <th scope="col">Favorito</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((it) => {
                const isFav = !!favoritos[it.id];
                return (
                  <tr key={it.id}>
                    <td data-label="Órgão">{it.orgao}</td>
                    <td data-label="Total de Despesas">{formatarMoeda(it.valorTotal)}</td>
                    <td data-label="Qtd. de Empenhos">{it.qtdEmpenhos}</td>
                    <td data-label="Favorito">
                      <button
                        className={`fav-btn ${isFav ? "fav" : ""}`}
                        aria-pressed={isFav}
                        aria-label={isFav ? `Remover ${it.orgao} dos favoritos` : `Adicionar ${it.orgao} aos favoritos`}
                        onClick={() => alternarFavorito(it)}
                      >
                        {isFav ? "★" : "☆"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="total-row">
                <td><strong>Total Geral</strong></td>
                <td><strong>{formatarMoeda(totalGeral)}</strong></td>
                <td><strong>{totalEmpenhos}</strong></td>
                <td aria-hidden="true">—</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      <section className="favoritos-section" aria-labelledby="fav-title">
        <h3 id="fav-title">Favoritos ({favoritosArray.length})</h3>
        {favoritosArray.length === 0 ? (
          <p className="empty small">Nenhum favorito adicionado.</p>
        ) : (
          <ul className="lista-favoritos" aria-live="polite">
            {favoritosArray.map((fav) => (
              <li key={fav.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <span>{fav.orgao}</span>
                <button
                  className="fav-btn fav"
                  title="Remover favorito"
                  onClick={() => alternarFavorito(fav)}
                  aria-label={`Remover ${fav.orgao} dos favoritos`}
                >
                  ★
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
};

export default TabelaDespesas;
