export class Const {
    //API URL PROD
    //public static URL = "http://nrquena.ddns.net:5000";
    
    //API URL DEV
    //public static URL = "http://rypsystems.cl:5000";
    public static URL = "http://localhost:5000";
    // public static URL = "http://45.7.231.212:5000";
    public static urlBoleta = "http://localhost:8081";
           
    //API PAGOS PROD
    //public static urlPago = 'https://app.payku.cl/api';
    //public static tokenPayKu = "Bearer a32eab3674b9a4d88113c9fae45a1f85";
    
    //API PAGOS DEV
    public static urlPago = 'https://des.payku.cl/api';
    public static tokenPayKu = "Bearer a32eab3674b9a4d88113c9fae45a1f85";

    //API MAIL
    public static urlMail = 'https://api.sendinblue.com/v3/smtp/email';
    public static tokenMail = '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';
    public static host =  window.location.protocol+'//'+ window.location.hostname+(location.port ? ':'+ window.location.port: '');
}