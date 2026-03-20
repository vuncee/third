const WeatherInput = document.getElementById("weather-input");
const button = document.getElementById("finder");
const list = document.getElementById("list");
const WeatherShows = document.getElementById("Weather-shows")
const apikey = import.meta.env.VITE_API_KEY;


button.addEventListener("click", async() =>{

const city = WeatherInput.value.trim();;

const response = await 
fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=metric&key=${apikey}&contentType=json`)

if(!response.ok){
  alert("City not found");
  return
}

const data = await response.json();

renderWeather(data);

})



function renderWeather(weatherData){

  WeatherShows.innerHTML = "";

const iconMap = {
    "snow": "https://cdn-icons-png.flaticon.com/512/2315/2315309.png",
    "rain": "https://cdn-icons-png.flaticon.com/512/1163/1163657.png",
    "fog": "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
    "wind": "https://cdn-icons-png.flaticon.com/512/2011/2011441.png",
    "cloudy": "https://cdn-icons-png.flaticon.com/512/1163/1163624.png",
    "partly-cloudy-day": "https://cdn-icons-png.flaticon.com/512/1163/1163661.png",
    "partly-cloudy-night": "https://cdn-icons-png.flaticon.com/512/1163/1163666.png",
    "clear-day": "https://cdn-icons-png.flaticon.com/512/869/869869.png",
    "clear-night": "https://cdn-icons-png.flaticon.com/512/3094/3094411.png"
  };

  weatherData.days[0].hours.forEach((hour, index) => {

   
    const shortTime = hour.datetime.slice(0, 5)
    const iconUrl = iconMap[hour.icon] || iconMap["clear-day"];
   
  if(index % 4 === 0){    
    const li = `<li class="weather-icon">
    <span>${shortTime}</span>
    <img src="${iconUrl}" alt="${hour.conditions}" class="weather-icon">
    <span>${Math.round(hour.temp)}°C</span>
    <span>${hour.conditions}</span>
    </li>`;



    WeatherShows.innerHTML += li;
   } 
  });




}