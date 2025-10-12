package br.univesp;

public class ParamsHeaders {

    static String token = "15062458-daf4-3f15-a528-31fb9c31f17c";

    static void params(){
        String param1 =  "anoExercicio";
        String param2 = String.valueOf(2020);
    }

    static void headers(){
        String headers = "Authorization";
        String header2 = "Bearer";
        String header3 = token;
    }
}
