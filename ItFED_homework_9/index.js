const getWeather = (event) => {
  event.preventDefault();
  console.log(event.target[0].value);

  const errorMessageElement = document.getElementById('error-message');
  errorMessageElement.textContent = '';
  const weatherIconElement = document.getElementById('weather-icon');
  weatherIconElement.setAttribute('src', '');
  weatherIconElement.setAttribute('alt', '');

  const apiKey = '338f7fe78ce069518774a402ed9cd049';
  const city = event.target[0].value;
  const errorMessage = 'Something went wrong! Try again!';

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error();
      }
    })
    .then((data) => {
      const iconCode = data.weather[0].icon;

      return fetch(`https://openweathermap.org/img/wn/${iconCode}@4x.png`);
    })
    .then((response) => {
      if (response.ok) {
        return response.url;
      } else {
        throw Error();
      }
    })
    .then((iconUrl) => {
      weatherIconElement.setAttribute('src', iconUrl);
      weatherIconElement.setAttribute('alt', 'Weather icon');
    })
    .catch((e) => {
      errorMessageElement.textContent = errorMessage;
      console.error(e);
    });
};

//338f7fe78ce069518774a402ed9cd049 key
