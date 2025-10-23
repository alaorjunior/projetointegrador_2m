package br.univesp;

import java.nio.charset.StandardCharsets;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import static jdk.internal.net.http.HttpRequestImpl.USER_AGENT;
import com.sun.net.httpserver.Request;
import class br/univesp/ParamsHeaders.java;

public class ConecaoAPI {
    public record User() {}

    User user = new User();
    static String userJson = mapper.writeValueAsString(user);

    public static void main(String[] args) throws IOException {

        URL url = new URL("http://gateway.apilib.prefeitura.sp.gov.br/sf/sof/v4/orgaos") ;
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("User-Agent", USER_AGENT);
        int responseCode = con.getResponseCode();

        Request request = new Request.Builder()
                .url(url)
                .build(ParamsHeaders);

        if(responseCode == HttpURLConnection.HTTP_OK){
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLinha;
            StringBuffer response = new StringBuffer();

            while ((inputLinha = in.readLine()) != null ){
                response.append(inputLinha);
            }
            in.close();

            System.out.println(response.toString());

        }else {
            System.out.println("Conexão não funcionou");
        }

        try {
            HttpURLConnection httpURLConnection = (httpURLConnection) url.openConnection();
            httpURLConnection.setRequestProperty("Content-Type", "application/json");

                try (OutputStream outputStream = httpURLConnection.getOutputStream()) {
                    outputStream.write(userJson.getBytes(StandardCharsets.UTF_8));
                    outputStream.flush();
                }

            System.out.println("HTTP status:" + responseCode);

        } catch (Exception e) {
            System.out.println("Erro" + e);
        }
    }
}