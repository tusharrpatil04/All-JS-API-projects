let input = document.querySelector(".input-box");
let searchBtn = document.querySelector(".fa-solid");
let temperature = document.querySelector(".temp");
let humidity = document.querySelector("#humidity-info");
let WindSpeed = document.querySelector("#wind-info");
let weatherImg = document.querySelector(".wether-img");

searchBtn.addEventListener("click", () => {
  let city = input.value;
  let apiKey = "1666e943b31ce6ecbeb2f78c35a1f28c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  getWeatherData(url);
});

async function getWeatherData(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();

    console.log("data:", data);
    console.log(data.weather[0].main);

    if (data.weather[0].main == "Clouds") {
      weatherImg.src = "images/cloud.png";
    } else if (data.weather[0].main == "Clear") {
      weatherImg.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherImg.src = "images/rain.png";
    } else if (data.weather[0].main == "Snow") {
      weatherImg.src = "images/snow.png";
    } else if (data.weather[0].main == "Mist") {
      weatherImg.src = "images/mist.png";
    }

    temperature.innerText = data.main.temp;
    humidity.innerText = data.main.humidity;
    WindSpeed.innerText = data.wind.speed;
  } catch (error) {
    alert("City not found. Please check spelling or try with country code.");
    weatherImg.src = "images/404.png";
    temperature.innerText = "0";
    humidity.innerText = "0%";
    WindSpeed.innerText = "0km/h";
  }
}
