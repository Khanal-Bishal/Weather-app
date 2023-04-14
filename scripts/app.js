//dom manipulation 
const cityForm = document.querySelector('form');
const card = document.querySelector(".card");
const details = document.querySelector('.details');
const time = document.querySelector("img.time");
const icon = document.querySelector('.icon img');
//===================updating the UI==========================

const updateUI = (data) => {
    /* ---------------------------------------------------------*/

    // const cityData=data.cityData;
    // const weatherData=data.weatherData;
    //destructing the data object here 
    /* ---------------------------------------------------------*/
    console.log(data);
    const { cityData, weatherData } = data;
    console.log(weatherData);
    details.innerHTML =
        `
    <h5 class="my-3 ">${cityData.EnglishName}</h5>
    <div class="my-3">${weatherData.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weatherData.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    `



    //===============removing the display:none of the card when we change the value in input field==============
    // if(card.classList.contains('d-none'))
    // {
    //     card.classList.remove('d-none');
    // }

    /*====================setting the image=============================*/
    let imgScr=null;
    if(weatherData.IsDayTime)
    {
        imgScr='./img/day.svg';
    }
    else 
    {
        imgScr='./img/night.svg';
    }
    time.setAttribute('src',imgScr);

    //===========setting the icons of weather===========
    iconSrc=`./img/icons/${weatherData.WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);
}

//=========updating the city information to the API=========================
const updateCity = async (city) => {
    
    const cityData = await getCity(city);
    const weatherData = await weather(cityData.Key);
    console.log(weatherData.WeatherText);
    return {
        cityData, weatherData
    };



};

cityForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //updating the value 
    updateCity(city)
        .then(data => { updateUI(data) })
        .catch(err => console.log(err));

    card.classList.remove('d-none');

    //setting up the entered city in the local storage
    localStorage.setItem('city',city);

});
//checking whether the city exist in the local storage 
if(localStorage.getItem('city'))
{
    updateCity(localStorage.city)
        .then(data => { updateUI(data) })
        .catch(err => console.log(err));
}

