package br.univesp;
/**
   * Jackson / Maven
*/
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;

/**
    * Cliente HTTP para consumir a API SOF da Prefeitura de SP.
 */
public class ConecaoAPI {

    private static final String BASE_URL = "https://gateway.apilib.prefeitura.sp.gov.br/sf/sof/v4";
    private final HttpClient client;
    private final ObjectMapper mapper;

    public ConecaoAPI() {
        this.client = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_2)
                .build();
        this.mapper = new ObjectMapper();
    }

    private void addHeaders(HttpRequest.Builder builder, Map<String, String> headers) {
        if (headers != null && !headers.isEmpty()) {
            headers.forEach(builder::header);
        }
    }

    /**
        * Faz GET /orgaos e interpreta corretamente o JSON retornado pela API.
     */
    public List<Orgao> getOrgaos() throws IOException, InterruptedException {
        String query = toQueryString(ParamsHeaders.getParams());
        String uri = BASE_URL + "/orgaos" + (query.isEmpty() ? "" : "?" + query);

        HttpRequest.Builder builder = HttpRequest.newBuilder()
                .uri(URI.create(uri))
                .GET();

        addHeaders(builder, ParamsHeaders.getHeaders());

        HttpRequest request = builder.build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        int status = response.statusCode();
        String body = response.body();

        if (status >= 200 && status < 300) {
            try {
                // Tenta desserializar diretamente (caso o retorno seja uma lista pura)
                return mapper.readValue(body, new TypeReference<List<Orgao>>() {});
            } catch (Exception e) {
                // Caso venha dentro de um objeto com "lstOrgaos"
                Map<String, Object> wrapper = mapper.readValue(body, new TypeReference<Map<String, Object>>() {});
                if (wrapper.containsKey("lstOrgaos")) {
                    String dataJson = mapper.writeValueAsString(wrapper.get("lstOrgaos"));
                    return mapper.readValue(dataJson, new TypeReference<List<Orgao>>() {});
                } else {
                    throw new IOException("Formato JSON inesperado. Corpo: " + body);
                }
            }
        } else {
            throw new IOException("GET /orgaos falhou. HTTP " + status + " - " + body);
        }
    }

    private String toQueryString(Map<String, String> params) {
        if (params == null || params.isEmpty()) return "";
        return params.entrySet()
                .stream()
                .map(entry -> entry.getKey() + "=" + entry.getValue())
                .reduce((a, b) -> a + "&" + b)
                .orElse("");
    }

    /**
     * POJO representando um órgão conforme o JSON da API.
     */
    public static class Orgao {
        public String codOrgao;
        public String txtDescricaoOrgao;
        public String codigoEmpresa;
        public String descricaoEmpresa;

        @Override
        public String toString() {
            return "Orgao{" +
                    "codOrgao='" + codOrgao + '\'' +
                    ", txtDescricaoOrgao='" + txtDescricaoOrgao + '\'' +
                    ", codigoEmpresa='" + codigoEmpresa + '\'' +
                    ", descricaoEmpresa='" + descricaoEmpresa + '\'' +
                    '}';
        }
    }

    public static void main(String[] args) {
        ConecaoAPI api = new ConecaoAPI();
        try {
            System.out.println("🔹 Chamando GET /orgaos ...");
            var orgaos = api.getOrgaos();

            System.out.printf("✅ Órgãos retornados: %d%n", orgaos.size());
            orgaos.stream().limit(10).forEach(System.out::println);

        } catch (Exception e) {
            System.err.println("❌ Erro ao chamar API: " + e.getMessage());
            e.printStackTrace();
        }
    }
}