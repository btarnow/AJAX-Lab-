'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  fetch('/fortune')
  .then(response => response.text())
  .then(fortune => {
    document.querySelector('#fortune-text').innerHTML = fortune;
  });
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;

  // TODO: request weather with that URL and show the forecast in #weather-info
  //start with fetching route (route stored in variable url, line 20)
  // /weather.json/
  fetch(`${url}?zipcode=${zipcode}`)
  //creating then response to get text and pull out only forecast
  //not sure if this is being done correctly
  .then(response => response.json())
  //creating next then response that puts the forecast text into 
  // example: >>> /search?term=honeydew'
  //weather.json?zipcode=91210
  .then(jsonObject =>{
    // console.log(jsonObject)
    document.querySelector('#weather-info').innerHTML = jsonObject.forecast;
  });
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  const formInputs = {
    melon_type: document.querySelector('#melon-type-field').value,
    qty: document.querySelector('#qty-field').value,
  };

  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type':'application/json'
    }
  })
  .then(response => response.json())
  .then(jsonResponse => {

    if (jsonResponse.code === "ERROR") {
      document.querySelector('#order-status').classList.add('order-error')
    }

    document.querySelector("#order-status").innerHTML = (`${jsonResponse.code}: 
    ${jsonResponse.msg}`);

  })
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);




