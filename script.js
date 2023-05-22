//Formularios
const result = document.querySelector('.result');
const formulario = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');
const nameCountry = document.querySelector('#country');

formulario.addEventListener('submit',(e)=>{
    e.preventDefault();
  
     if(nameCity.value === '' || nameCountry.value === ''){
        showError('The fields are required...');
        return;
     }

     callApi(nameCity.value, nameCountry.value);
});


const callApi = async (city,country) =>{
    const apiId = '17b3ad7c9d25eca7f846dd0f72f9ef0e';
    const url =   `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;
     try{
        const res = await fetch(url);
        const data = await res.json();

        //validacion 
        if(data.cod === '404'){
            showError("city not found")
        } else {
            clearHtml()
            showWeather(data)
        }
              
     } catch(error){
        console.log(error)
     }
}
//Pintar datos
function showWeather(data){
    const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;
    
    const grados = kelvinT0Centigrade(temp);
    const max = kelvinT0Centigrade(temp_max);
    const min = kelvinT0Centigrade(temp_min);

    const content = document.createElement('div');
    content.innerHTML = `
            <h5>Clima en ${name}</h5>
            <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
            <h2>${grados}°C</h2>
            <p>Max: ${max}°C</p>
            <p>Min: ${min}°C</p> 
    `
    result.appendChild(content);
}

function clearHtml(){
   result.textContent = '';
}

//Error
function showError(message){
    clearHtml();
    const div = document.createElement('div');
    div.innerHTML = `
           <div class="alert alert-danger mt-5" role="alert">
             <i class="bi bi-exclamation-octagon-fill"></i>   ${message}
           </div>
    `
    //Eliminar (alert) luego de 3 segundos
    setTimeout(()=>{
        div.remove();
    },3000);

   formulario.appendChild(div);
};

function kelvinT0Centigrade(temp){
   return parseInt(temp - 273.15);
};
