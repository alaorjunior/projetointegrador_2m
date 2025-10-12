package br.univesp;

import okhttp3.*;

public class ConecaoAPI {
    public static void main(String[] args) {

        String url = "http://gateway.apilib.prefeitura.sp.gov.br/sf/sof/v4/orgaos";

        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url(url)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful()) {
                String responseData = response.body().string();
                // Parse os dados da resposta (JSON, XML, etc.) e use-os em seu programa
            } else {
                // Lide com erros!
            }
        } catch (Exception e) {
            // Lide com exceções!
        }
    }
}