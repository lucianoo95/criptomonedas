class Interface {
  constructor() {
    this.init();
  }

  init() {
    this.buildSelect();
  }

  buildSelect() {
    api.getCryptoCurrency()
      .then(data => {
        //crear un select de
        const currencySelect = document.querySelector('#criptomoneda');

        //iterar resultados de criptomedas de la API
        for (let [key, value] of Object.entries(data.Data)) {
          //añadir el symbol y el nombre como opciones.
          const option = document.createElement('option');
          option.value = value.Symbol;
          option.text = value.CoinName;

          currencySelect.appendChild(option);
        }
      })

  }

  showMessage(message, classes) {
    const div = document.createElement('div');
    div.className = classes;
    div.appendChild(document.createTextNode(message));

    //Insertar mensaje en html
    const divMessages = document.querySelector('.mensajes');
    divMessages.appendChild(div);

    //ocultar contenido del mensaje
    setTimeout(() => {
      divMessages.firstElementChild.remove();
    }, 3000);
  }

  //Imprimir resultado de la cotizacion. 
  showResults(result, currency, cryptoCurrency) {
    //En caso de existir un resultado previo lo elimina
    const previousResult = document.querySelector('#resultado > div');
    if (previousResult) {
      previousResult.remove();
    }

    const moneyInfo = result[cryptoCurrency][currency];
    let price = moneyInfo.PRICE.toFixed(2),
      percentage = moneyInfo.CHANGEPCTDAY.toFixed(2),
      date = new Date(moneyInfo.LASTUPDATE * 1000).toLocaleDateString('es-AR');

    let templateHTML = `
    <div class="card bg-warning">
      <div class="card-header">
        <h5 class="card-title p-0">Resultado</h5>
      </div>
      <div class="card-body">
        <p>
        El precio de: ${moneyInfo.FROMSYMBOL} a moneda ${moneyInfo.TOSYMBOL} es de: ${price}.
        </p>
        <p>Variación último día: ${percentage} %</p>
        <p>Última Actualización: ${date}</p>
      </div>
    </div>`;

    //Mostrar spinner
    this.showHideSpinner('block');

    setTimeout(() => {
      //insertar el resultado
      document.querySelector('#resultado').innerHTML = templateHTML;
      //ocultar spinner
      this.showHideSpinner('none');
    }, 3000);

  }

  //Mostrar spinner de carga
  showHideSpinner(view) {
    const spinner = document.querySelector('.contenido-spinner');
    spinner.style.display = view;
  }

}