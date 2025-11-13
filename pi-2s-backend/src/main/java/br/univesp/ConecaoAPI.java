import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpTimeoutException;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * ConecaoAPI
 *
 * Busca os 20 primeiros órgãos e suas despesas e empenhos (até 10 páginas),
 * filtrando via "&codOrgao=X" e gera um JSON consolidado com todas as informações.
 */
public class ConecaoAPI {

    // === CONFIGURAÇÕES PRINCIPAIS ===
    private static final String BASE_URL = "https://gateway.apilib.prefeitura.sp.gov.br/sf/sof/v4";
    private static final String TOKEN = "d1210d16-bfb8-3450-b8d8-06667329ec70";

    private static final int LIMITE_ORGAOS = 20;
    private static final int LIMITE_PAGINAS = 10;
    private static final Duration TIMEOUT = Duration.ofSeconds(20);

    private static final HttpClient CLIENT = HttpClient.newBuilder()
            .connectTimeout(TIMEOUT)
            .followRedirects(HttpClient.Redirect.ALWAYS)
            .build();

    public static void main(String[] args) {
        try {
            ObjectMapper mapper = new ObjectMapper();

            // 1️⃣ Buscar os órgãos
            System.out.println("Buscando órgãos (página 1)...");
            String urlOrgaos = BASE_URL + "/orgaos?anoExercicio=2024&pagina=1";
            String jsonOrgaos = fazerRequisicao(urlOrgaos, "órgãos");

            OrgaosResponse orgaosResp = mapper.readValue(jsonOrgaos, OrgaosResponse.class);
            List<Orgao> orgaos = orgaosResp.getLstOrgaos() != null ? orgaosResp.getLstOrgaos() : new ArrayList<>();

            if (orgaos.size() > LIMITE_ORGAOS) {
                orgaos = orgaos.subList(0, LIMITE_ORGAOS);
            }

            System.out.println("Foram encontrados " + orgaos.size() + " órgãos.\n");

            // 2️⃣ Buscar despesas e empenhos para cada órgão
            List<OrgaoInfo> resultado = new ArrayList<>();

            for (Orgao orgao : orgaos) {
                String codOrgao = orgao.getCodOrgao();
                System.out.println("🔹 Processando órgão: " + codOrgao + " - " + orgao.getTxtDescricaoOrgao());

                List<Map<String, Object>> despesas = fetchDespesasFiltradas(2024, 12, codOrgao);
                List<Map<String, Object>> empenhos = fetchEmpenhosFiltrados(2024, 12, codOrgao);

                OrgaoInfo info = new OrgaoInfo();
                info.setOrgao(orgao);
                info.setDespesas(despesas);
                info.setEmpenhos(empenhos);
                resultado.add(info);

                System.out.println("✔ " + codOrgao + ": " + despesas.size() + " despesas | " + empenhos.size() + " empenhos\n");
            }

            // 3️⃣ Gerar JSON consolidado e exportar para arquivo
            exportarJson(resultado);

        } catch (Exception e) {
            System.err.println("❌ Erro durante execução: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // ==========================================================
    // MÉTODOS DE REQUISIÇÃO
    // ==========================================================

    private static List<Map<String, Object>> fetchDespesasFiltradas(int anoDotacao, int mesDotacao, String codOrgao)
            throws IOException, InterruptedException {

        List<Map<String, Object>> acumulado = new ArrayList<>();
        ObjectMapper mapper = new ObjectMapper();

        for (int pagina = 1; pagina <= LIMITE_PAGINAS; pagina++) {
            String url = String.format(
                    "%s/despesas?anoDotacao=%d&mesDotacao=%d&codOrgao=%s&pagina=%d",
                    BASE_URL, anoDotacao, mesDotacao, codOrgao, pagina);

            System.out.println("Buscando despesas (" + codOrgao + ") - página " + pagina);
            String json = fazerRequisicao(url, "despesas");
            DespesasResponse resp = mapper.readValue(json, DespesasResponse.class);

            List<Map<String, Object>> pageList = resp.getLstDespesas();
            if (pageList == null || pageList.isEmpty()) break;

            acumulado.addAll(pageList);

            int totalPaginas = resp.getMetaDados() != null ? resp.getMetaDados().getQtdPaginas() : 1;
            if (pagina >= totalPaginas) break;
        }
        return acumulado;
    }

    private static List<Map<String, Object>> fetchEmpenhosFiltrados(int anoEmpenho, int mesEmpenho, String codOrgao)
            throws IOException, InterruptedException {

        List<Map<String, Object>> acumulado = new ArrayList<>();
        ObjectMapper mapper = new ObjectMapper();

        for (int pagina = 1; pagina <= LIMITE_PAGINAS; pagina++) {
            String url = String.format(
                    "%s/empenhos?anoEmpenho=%d&mesEmpenho=%d&codOrgao=%s&pagina=%d",
                    BASE_URL, anoEmpenho, mesEmpenho, codOrgao, pagina);

            System.out.println("Buscando empenhos (" + codOrgao + ") - página " + pagina);
            String json = fazerRequisicao(url, "empenhos");
            EmpenhosResponse resp = mapper.readValue(json, EmpenhosResponse.class);

            List<Map<String, Object>> pageList = resp.getLstEmpenhos();
            if (pageList == null || pageList.isEmpty()) break;

            acumulado.addAll(pageList);

            int totalPaginas = resp.getMetaDados() != null ? resp.getMetaDados().getQtdPaginas() : 1;
            if (pagina >= totalPaginas) break;
        }
        return acumulado;
    }

    // ==========================================================
    // MÉTODO DE EXPORTAÇÃO
    // ==========================================================

    private static void exportarJson(List<OrgaoInfo> resultado) {
        ObjectMapper mapper = new ObjectMapper();
        File arquivo = new File("resultado.json");

        try {
            mapper.writerWithDefaultPrettyPrinter().writeValue(arquivo, resultado);
            System.out.println("📁 Resultado exportado com sucesso para: " + arquivo.getAbsolutePath());
        } catch (IOException e) {
            System.err.println("❌ Falha ao salvar o arquivo JSON: " + e.getMessage());
        }
    }

    // ==========================================================
    // REQUISIÇÃO HTTP GENÉRICA COM TRATAMENTO DE ERROS
    // ==========================================================

    private static String fazerRequisicao(String url, String nomeApi)
            throws IOException, InterruptedException {

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .timeout(TIMEOUT)
                .header("Authorization", "Bearer " + TOKEN)
                .header("Accept", "application/json")
                .GET()
                .build();

        try {
            HttpResponse<String> response = CLIENT.send(request, HttpResponse.BodyHandlers.ofString());
            int status = response.statusCode();

            if (status != 200) {
                throw new IOException("Erro HTTP " + status + " na API de " + nomeApi + " (URL: " + url + ")");
            }

            return response.body();

        } catch (HttpTimeoutException e) {
            throw new IOException("Timeout na requisição da API de " + nomeApi + " (URL: " + url + ")", e);
        }
    }

    // ==========================================================
    // CLASSES DE MODELO (para deserialização JSON)
    // ==========================================================

    public static class OrgaosResponse {
        private MetaDados metaDados;
        private List<Orgao> lstOrgaos;
        public MetaDados getMetaDados() { return metaDados; }
        public void setMetaDados(MetaDados metaDados) { this.metaDados = metaDados; }
        public List<Orgao> getLstOrgaos() { return lstOrgaos; }
        public void setLstOrgaos(List<Orgao> lstOrgaos) { this.lstOrgaos = lstOrgaos; }
    }

    public static class DespesasResponse {
        private MetaDados metaDados;
        private List<Map<String, Object>> lstDespesas;
        public MetaDados getMetaDados() { return metaDados; }
        public void setMetaDados(MetaDados metaDados) { this.metaDados = metaDados; }
        public List<Map<String, Object>> getLstDespesas() { return lstDespesas; }
        public void setLstDespesas(List<Map<String, Object>> lstDespesas) { this.lstDespesas = lstDespesas; }
    }

    public static class EmpenhosResponse {
        private MetaDados metaDados;
        private List<Map<String, Object>> lstEmpenhos;
        public MetaDados getMetaDados() { return metaDados; }
        public void setMetaDados(MetaDados metaDados) { this.metaDados = metaDados; }
        public List<Map<String, Object>> getLstEmpenhos() { return lstEmpenhos; }
        public void setLstEmpenhos(List<Map<String, Object>> lstEmpenhos) { this.lstEmpenhos = lstEmpenhos; }
    }

    public static class MetaDados {
        private String txtMensagemErro;
        private int qtdPaginas;
        private String txtStatus;
        public String getTxtMensagemErro() { return txtMensagemErro; }
        public void setTxtMensagemErro(String txtMensagemErro) { this.txtMensagemErro = txtMensagemErro; }
        public int getQtdPaginas() { return qtdPaginas; }
        public void setQtdPaginas(int qtdPaginas) { this.qtdPaginas = qtdPaginas; }
        public String getTxtStatus() { return txtStatus; }
        public void setTxtStatus(String txtStatus) { this.txtStatus = txtStatus; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Orgao {
        private String codOrgao;
        private String txtDescricaoOrgao;
        public String getCodOrgao() { return codOrgao; }
        public void setCodOrgao(String codOrgao) { this.codOrgao = codOrgao; }
        public String getTxtDescricaoOrgao() { return txtDescricaoOrgao; }
        public void setTxtDescricaoOrgao(String txtDescricaoOrgao) { this.txtDescricaoOrgao = txtDescricaoOrgao; }
    }

    // Estrutura consolidada de retorno
    public static class OrgaoInfo {
        private Orgao orgao;
        private List<Map<String, Object>> despesas;
        private List<Map<String, Object>> empenhos;
        public Orgao getOrgao() { return orgao; }
        public void setOrgao(Orgao orgao) { this.orgao = orgao; }
        public List<Map<String, Object>> getDespesas() { return despesas; }
        public void setDespesas(List<Map<String, Object>> despesas) { this.despesas = despesas; }
        public List<Map<String, Object>> getEmpenhos() { return empenhos; }
        public void setEmpenhos(List<Map<String, Object>> empenhos) { this.empenhos = empenhos; }
    }
}
