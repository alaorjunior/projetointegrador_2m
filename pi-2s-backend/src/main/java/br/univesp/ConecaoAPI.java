package br.univesp;

import java.util.Scanner;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class ConecaoAPI {
    public static void main(String[] args) {

        URL url = new URL("http://gateway.apilib.prefeitura.sp.gov.br/sf/sof/v4/orgaos") ;
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("User-Agent", USER_AGENT);
        int responseCode = con.getResponseCode();

        isSuccessful.status = 200;

        Request request = new Request.Builder()
                .url(url)
                .build(ParamsHeaders);

        try (Response response = client.newCall(request).execute()) {

            String userJson = ExampleUtils.toJson(user);

            if (response.isSuccessful()) {
                String responseData = response.body().string();
                return responseData.JSON().get('IstOrgaos' + []);
            } else {
                System.out.println("Erro HTTP" + responseData_code);
            }
        } catch (Exception e) {
            System.out.println("Erro" + e);
        }
    }
}