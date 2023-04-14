 window.onload = function (){
    var apiKey = "ebf1d2bd128d39819472de848e5bd7c3";
    var cityName = document.getElementById('cityInput');
    var submit = document.getElementById('citySubmit');
    
    console.log(cityName);
    console.log(submit);
    
    forecastCity = "";
    
    getWeather();
    fiveDayForecast();
    
    function getWeather (){
      submit.addEventListener('click', ()=>{
        let city = cityName.value;
        
        
        fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid='+apiKey)
        .then(response => response.json())
        .then(data=> {
            console.log(data);
          
            
            
          let currentCityWeather = document.querySelector('.card-title');
          currentCityWeather.textContent = data.name;
          
          let currentTemp = document.querySelector('.tempNow');
          currentTemp.textContent = 'Current Temp: ' + data.main.temp;
          
          let weatherIcon = document.getElementById('currentImg');
          let icon = data.weather[0].icon;
          
          let iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
          weatherIcon.src = iconUrl;
          
          let currentDt = data.dt;
          let date = new Date(currentDt*1000);
          let formattedDate = date.toLocaleDateString();
          
          let dateBox = document.querySelector('.currentDate');
          dateBox.textContent = formattedDate;
          
        }
        )
        .catch(error => {
          console.log(error);
        })
    
      })
      }
    
      function fiveDayForecast(){
            submit.addEventListener('click', ()=>{
              const city = cityName.value;
              fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric&appid='+apiKey)
              .then(response => response.json())
              .then (data => {
                console.log(data);
                
                const Days = {
                  day1: data.list[0].dt,
                  day2: data.list[8].dt,
                  day3: data.list[16].dt,
                  day4: data.list[24].dt,
                  day5: data.list[32].dt,
                  
                }
               
               
                
                const cardDates = document.querySelectorAll('.cardDate');
                for (var i = 0; i < cardDates.length; i++){
                  const current = Days[Object.keys(Days)[i]];
                  let date = new Date(current * 1000);
                  let formattedDate =date.toLocaleDateString();
                    cardDates[i].textContent = formattedDate;
                    console.log(data.list[i].dt_txt);
                }
                
              
                
                
                
              
                for (var j = 0; j < cardDates.length; j ++) {
                const forecastIcon = document.createElement('img');
                forecastIcon.setAttribute('id', "castIcon");
                icons = data.list[j].weather[0].icon;
                
                const iconsUrl = "https://openweathermap.org/img/wn/" + icons + "@2x.png";
                forecastIcon.src = iconsUrl;
               
                cardDates[j].append(forecastIcon);
                }
    
                
                  console.log(data.list[0].main.temp_max)
                const dailyTemp = document.querySelectorAll('.dailyTemp');
                const Temp = {
                  temp1: data.list[0].main.temp_max,
                  temp2: data.list[8].main.temp_max,
                  temp3: data.list[16].main.temp_max,
                  temp4: data.list[24].main.temp_max,
                  temp5: data.list[32].main.temp_max,
                };
                
                console.log(Temp);
                for(var h = 0; h < dailyTemp.length; h ++) {
                  dailyTemp[h].innerHTML = "Max Temp: " + Temp[Object.keys(Temp)[h]];
                }
    
                const minTemp = {
                  min1: data.list[0].main.temp_min,
                  min2: data.list[8].main.temp_min,
                  min3: data.list[16].main.temp_min,
                  min4: data.list[24].main.temp_min,
                  min5: data.list[32].main.temp_min,
                } 
                console.log(minTemp);
                const min = document.querySelectorAll('.minTemp');
                for(var j =0; j < min.length; j ++) {
                  min[j].innerHTML = "Min Temp: " + minTemp[Object.keys(minTemp)[j]];
                } 
              
              
                var city = cityName.value;
                for (var k = 0; k <cityName.length; k ++){
                var localBtn = document.createElement('input');
                localBtn.classList.add('btn', 'btn-primary');
                localBtn.setAttribute('id', 'savedLocation');
                localBtn.setAttribute('value', city);
                localBtn.setAttribute('value', 'Submit')
                localBtn.setAttribute('type', 'button')
                localStorage.setItem(city, city);
              }  
                submit.append(localBtn);
    
                
                     
                 
                  
                
    
                
                
                
                
    
              
              }
              )
            })
      } 
    }