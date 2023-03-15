const API_KEY = `3265874a2c77ae4a04bb96236a642d2f`;
const form = document.getElementById('form');
let weather = document.getElementById('weather')
let search = document.getElementById('search');

let date = document.querySelector('.date');
let weatherPng = document.querySelector('.weather-png');
let deg = document.querySelector('.deg');
let otherInf = document.querySelector('.other-inf');
let cityName = document.querySelector('.city-name');
let submit = document.querySelector('.submit');



submit.addEventListener('click', (e) => {
    let city = search.value;
    e.preventDefault();
   if(city.length<=0){
    alert('Please Enter Your City Name')
   }
    getWeather(city);
})

const getWeather = async (city) => {

   

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    document.getElementById('loader').style.visibility='visible'
    const res = await fetch(url);
    document.getElementById('loader').style.visibility = 'hidden'
    const data = await res.json()
    return showWeather(data) ;

}

const showWeather = (data) => {
    console.log(data)
    if (data.cod == '404') {
        document.querySelector('.noFound').style.display="flex";
      weather.style.display='none';
    }
    
    else {
       document.querySelector('.noFound').style.display="none";
       weather.style.display='block'
let newDate= new Date();
let option = {weekday:'long',month:'long',day:'numeric',year:'numeric'}
let formatDate = newDate.toLocaleDateString('en-us',option);
console.log(formatDate)

date.textContent = formatDate;
cityName.textContent = data.name;
weatherPng.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
deg.innerHTML = `${data.main.temp}&#8451`;

otherInf.innerHTML = `<ul>
<li><span>Wind Speed</span><p>${data.wind.speed} Km/h</p> </li>
<li><span>Humidity</span><p>${data.main.humidity} %</p> </li>
<li><span>Pressure</span><p> ${data.main.pressure} hpa</p></li>
<li><span>Min Temp</span><p>${data.main.temp_min}&#8451</p> </li>
<li><span>Min Temp</span><p>${data.main.temp_max}&#8451</p> </li>
</ul>`


       
    }
}











