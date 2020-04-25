//Instanciar clases
const api = new API('cb7fd37f129f54c4b39398c6f28acf186de11b0aafc81373778c700f23c25a03');
const ui = new Interface();

//Leer el formulario
const form = document.querySelector('#formulario');

//listenner
form.addEventListener('submit', (e) => {
  e.preventDefault();

  //leer moneda seleccionada
  const currency = document.querySelector('#moneda');
  const currencySelected = currency.options[currency.selectedIndex].value;

  //leer la criptomoneda seleccionada
  const cryptoCurrency = document.querySelector('#criptomoneda');
  const cryptoCurrencySelected = cryptoCurrency.options[cryptoCurrency.selectedIndex].value;

  //comprobar campos del form.
  if (currencySelected === '' || cryptoCurrencySelected === '') {
    //mostrar mensaje de error. 
    ui.showMessage('Ambos campos son obligatorios', 'alert bg-danger text-center');
  } else {
    //consultar a la api.
    api.getValues(currencySelected, cryptoCurrencySelected)
      .then(data => {
        ui.showResults(data.RAW, currencySelected, cryptoCurrencySelected);
      })
  }

})

