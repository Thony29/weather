const search = document.getElementById("search");
const btn = document.querySelector(".btn");
const weather_main = document.querySelector(".weather_main");
const weather_description = document.querySelector(".weather_description");
let weather_icon = document.querySelector("img");
let fahrenheit = document.querySelector(".fahrenheit");
let celcius = document.querySelector(".celcius");


let load_weather = async () => {
  let search_value = search.value;
  if (!search_value) {
    search_value = "london";
  }

  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${search_value}&APPID=91fff62ae5463f6aa25d6242c50d2d02`,
    { mode: "cors" }
  );

  ///Main
  const weather_data = await response.json();
  console.log(weather_data);
  let main = weather_data.weather[0].main;
  ///Description
  let description = weather_data.weather[0].description;
  weather_description.textContent = description;
  weather_main.textContent = main;

  ///Icon/image
  let icon_num = weather_data.weather[0].icon;
  let icon_response = await fetch(
    `http://openweathermap.org/img/wn/${icon_num}@2x.png`,
    { mode: "cors" }
  );
  let img_data = icon_response.url;
  weather_icon.src = img_data;

  ///Temp
  let temp = weather_data.main.temp;
  //converting kelvin to celcius
  let round_celc = temp - 273.15;
  let celc = round_celc.toFixed(2);
  console.log(celcius);
  celcius.textContent = celc;
  ////kelvin to fahrenheit
  let round_fahrenheit = (temp - 273.15) * 1.8 + 32;
  let fahren = round_fahrenheit.toFixed(2);
  console.log(fahrenheit);
  fahrenheit.textContent = fahren;

  //////////

};


/////toggle function
function feh_toggle() {
    let feh_toggle = document.getElementById("feh_click");
    if (feh_toggle.style.display === "none") {
      feh_toggle.style.display = "block";
    } else {
      feh_toggle.style.display = "none";
    }
  }
  

btn.addEventListener("click", load_weather);
