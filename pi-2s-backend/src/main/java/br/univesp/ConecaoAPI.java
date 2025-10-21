package br.univesp;

import com.sun.jdi.request.ExceptionRequest;
import okhttp3.*;

public class ConecaoAPI {
    public static void main(String[] args) {

        String url = "http://gateway.apilib.prefeitura.sp.gov.br/sf/sof/v4/orgaos";

//        OkHttpClient client = new OkHttpClient();
        isSuccessful.status = 200;

        Request request = new Request.Builder()
                .url(url)
                .build(ParamsHeaders);

        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful()) {
                String responseData = response.body().string();
                return responseData.JSON().get('IstOrgaos',[]);
                // Parse os dados da resposta (JSON, XML, etc.) e use-os em seu programa
            } else {
                System.out.print("Erro HTTP", responseData_code);
            }
        } catch (Exception e) {
            InterruptedException;
        }
    }
}