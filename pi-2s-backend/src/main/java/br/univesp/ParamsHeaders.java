package br.univesp;

import java.util.HashMap;
import java.util.Map;

public class ParamsHeaders {

    private static final String TOKEN = "d1210d16-bfb8-3450-b8d8-06667329ec70";

    public static String getAuthorizationHeader() {
        return "Bearer " + TOKEN;
    }

    public static Map<String, String> getHeaders() {
        Map<String, String> headers = new HashMap<>();
        headers.put("Authorization", getAuthorizationHeader());
        headers.put("Content-Type", "application/json; charset=UTF-8");
        headers.put("Accept", "application/json");
        return headers;
    }

    public static Map<String, String> getParams() {
        Map<String, String> params = new HashMap<>();
        // MANTIDO EM 2024 para fornecer um ano de consulta consolidado
        params.put("anoExercicio", "2024");
        return params;
    }
}