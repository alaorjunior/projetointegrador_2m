import { useEffect, useState } from "react";
import "../styles/style.css";

/**
 * Componente que exibe uma tabela com totais de despesas (valLiquidado)
 * e quantidade de empenhos por órgão.
 */
const TabelaDespesas = () => {
  const LS_FAV_KEY = "sof_favoritos_v1";

  const [dados, setDados] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [favoritos, setFavoritos] = useState({});

  // === Carrega favoritos do localStorage ===
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(LS_FAV_KEY)) || {};
      setFavoritos(stored);
    } catch {
      setFavoritos({});
    }
  }, []);

  // === Busca dados JSON da pasta public/assets ===
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const res = await fetch("/assets/resultado.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`Erro HTTP ${res.status}`);
        const data = await res.json();

        // === Mapeia e normaliza ===
        const lista = data.map((item) => {
          const org = item.orgao || {};
          const despesas = Array.isArray(item.despesas) ? item.despesas : [];
          const empenhos = Array.isArray(item.empenhos) ? item.empenhos : [];

          const codOrgao = org.codOrgao || "(sem código)";
          const nomeOrgao =
            org.txtDescricaoOrgao || item.descricao || "(sem nome)";

          // === Total de despesas (somente valLiquidado) ===
          const totalDespesas = despesas.reduce((soma, d) => {
            const val = parseFloat(d.valLiquidado) || 0;
            return soma + val;
          }, 0);

          // === Quantidade de empenhos ===
          const qtdEmpenhos = empenhos.length;

          return {
            id: `${codOrgao}-${nomeOrgao}`,
            codOrgao,
            orgao: nomeOrgao,
            valorTotal: totalDespesas,
            qtdEmpenhos,
          };
        });

        // === Agrupa órgãos com mesmo codOrgao e nome ===
        const agrupado = lista.reduce((acc, item) => {
          const chave = `${item.codOrgao}-${item.orgao}`.toLowerCase().trim();
          if (!acc[chave]) {
            acc[chave] = {
              id: chave,
              codOrgao: item.codOrgao,
              orgao: item.orgao,
              valorTotal: 0,
              qtdEmpenhos: 0,
            };
          }
          acc[chave].valorTotal += item.valorTotal;
          acc[chave].qtdEmpenhos += item.qtdEmpenhos;
          return acc;
        }, {});

        const dadosConsolidados = Object.values(agrupado);

        setDados(dadosConsolidados);
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

  // === Funções auxiliares ===
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
    isNaN(valor)
      ? "—"
      : valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  // === Estados de carregamento ===
  if (carregando) return <div className="loading">Carregando dados...</div>;
  if (erro) return <div className="error">{erro}</div>;
  if (!dados.length) return <div className="empty">Nenhum dado encontrado.</div>;

  const favoritosArray = Object.values(favoritos);

  // === Totais gerais ===
  const totalEmpenhos = dados.reduce((s, it) => s + it.qtdEmpenhos, 0);
  const totalGeral = dados.reduce((s, it) => s + it.valorTotal, 0);

  return (
    <section className="main-container">
      <section className="tabela-container"> {/* Fazer o CSS da tabela container */}
        <h2>Despesas por Órgão</h2>
        <p className="small">
          Total de órgãos listados: <strong>{dados.length}</strong>{" | "}
          Total de empenhos: <strong>{totalEmpenhos}</strong>{" | "}
          Total geral de despesas: <strong>{formatarMoeda(totalGeral)}</strong>
        </p>

        {/* === Tabela Principal === */}
        <table className="tabela-despesas"> {/* Fazer o CSS da tabela despesas */}
          <thead>
            <tr>
              <th>Órgão</th>
              <th>Total de Despesas</th>
              <th>Qtd. de Empenhos</th>
              <th>Favorito</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((it) => {
              const isFav = !!favoritos[it.id];
              return (
                <tr key={it.id}>
                  <td>{it.orgao}</td>
                  <td>{formatarMoeda(it.valorTotal)}</td>
                  <td>{it.qtdEmpenhos}</td>
                  <td>
                    <button
                      className={`fav-btn ${isFav ? "fav" : ""}`}
                      title={isFav ? "Remover favorito" : "Adicionar aos favoritos"}
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
              <td>—</td>
            </tr>
          </tfoot>
        </table>
      </section>

      {/* === Lista de Favoritos === */}
      <section className="favoritos-section"> {/* Fazer o CSS do favoritos section */}
        <h3>Favoritos ({favoritosArray.length})</h3>
        {favoritosArray.length === 0 ? (
          <p className="empty small">Nenhum favorito adicionado.</p>
        ) : (
          <ul className="lista-favoritos">
            {favoritosArray.map((fav) => (
              <li key={fav.id}>
                <span>{fav.orgao}</span>
                <button
                  className="fav-btn fav"
                  title="Remover favorito"
                  onClick={() => alternarFavorito(fav)}
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
