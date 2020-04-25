class API {
  constructor(apikey) {
    this.apikey = apikey;
  }

  //Obtener todas las monedas.
  async getCryptoCurrency() {
    const url = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apikey}`;
    //fetch a la API
    const allCoins = await fetch(url);
    const result = await allCoins.json();
    return result;
  }

  //Obtener valores de las monedas
  async getValues(currency, cryptoCurrency) {
    console.log(currency, cryptoCurrency);
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}&api_key=${this.apikey}`;
    //fetch a la api.
    const convertValues = await fetch(url);
    const results = convertValues.json();
    return results;
  }

}


console.log('Nada que ver');
console.log('Nada que ver');


