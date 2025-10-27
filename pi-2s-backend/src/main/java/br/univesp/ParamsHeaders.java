package br.univesp;

import java.util.HashMap;
import java.util.Map;

public class ParamsHeaders {

    /**
        Token fixo da API
    */

    private static final String TOKEN = "d1210d16-bfb8-3450-b8d8-06667329ec70";

    /**
        Retorna o token completo no formato Bearer para uso no header Authorization.
     */
    public static String getAuthorizationHeader() {
        return "Bearer " + TOKEN;
    }

    /**
        Retorna um Map com os headers necessários para chamada HTTP.
     */
    public static Map<String, String> getHeaders() {
        Map<String, String> headers = new HashMap<>();
        headers.put("Authorization", getAuthorizationHeader());
        headers.put("Content-Type", "application/json; charset=UTF-8");
        headers.put("Accept", "application/json");
        return headers;
    }

    /**
        Retorna parâmetros usados pela API da Prefeitura.
        Exemplo: ?anoExercicio=2020
     */
    public static Map<String, String> getParams() {
        Map<String, String> params = new HashMap<>();
        params.put("anoExercicio", "2020");
        return params;
    }

}