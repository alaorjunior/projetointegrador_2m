fetch('https://gateway.apilib.prefeitura.sp.gov.br/sf/sof/v4') /* URL API */
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Erro:', error));
