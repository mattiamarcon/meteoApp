import { useRef, useState } from "react";

function App() {

  const [citta,setCitta]=useState("");
  const coordinate = useRef({});

  const apiKey="8794527c75af42af740a272568e1f961";

  function getCoordinate(){
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${citta}&limit=&appid=${apiKey}`)
    .then(res=>res.json())
    .then(json=>{
        coordinate.current={lat:json[0].lat,lon:json[0].lon};
        getWheter();
    })
    .catch(()=>{
      document.getElementById("noCity").classList.remove("hidden");
      document.getElementById("secondPart").classList.add("hidden");
      
    });
    const inputCity=document.getElementById("inputCity");
    inputCity.value="";
  }

  function getWheter(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinate.current.lat}&lon=${coordinate.current.lon}&appid=${apiKey}`)
    .then(ris=>ris.json())
    .then(json=>{
      const cityName=document.getElementById("cityName");
      console.log(cityName)
      cityName.innerText=citta;
      const grade=document.getElementById("grade");
      grade.innerText=`${Math.ceil(json.main.temp-273)}°`;

      const wth=document.getElementById("wth");    

      switch(json.weather[0].main){
        case "Snow":
          wth.src="images/snow.png";
          break;
        case "Rain":
          wth.src="images/rain.png";
            break;
        case "Mist":
          wth.src="images/mist.png";
          break;
        case "Drizzle":
          wth.src="images/drizzle.png";
          break;
        case "Clouds":
          wth.src="images/clouds.png";
          break;
        case "Clear":
          wth.src="images/clear.png";
          break;
      }
      //capire se si può fare che se premo invio parta automatico

      const humidityData=document.getElementById("humidityData");
      const windData=document.getElementById("windData");

      humidityData.innerText=`${json.main.humidity}%`;
      windData.innerText=`${json.wind.speed}km/h`;

      document.getElementById("noCity").classList.add("hidden");
      document.getElementById("secondPart").classList.remove("hidden");
    })
  }

  return (
    <div className="w-full h-lvh grid place-items-center bg-gradient-to-br from-yellow-500 to-green-600 text-center">
      <div className="lg:w-3/5 xl:w-1/3 lg:h-4/5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 lg:rounded-xl w-full h-full grid place-items-center">
        <div>
          <input type="text" placeholder="Cerca città" className="rounded-l-md p-3 border-black border-2 border-r-0 focus:outline-none" id="inputCity" onInput={(e)=>setCitta(e.target.value)} />
          <button onClick={getCoordinate} className="border-black rounded-r-md border-2 border-l-0 p-3 bg-gradient-to-l from-blue-600 to-blue-400 hover:from-blue-300 hover:to-blue-500 ">CERCA</button>
        </div>

        <h1 class="text-5xl font-semibold text-white hidden mx-auto" id="noCity">Città non trovata</h1>
        
        <div id="secondPart" className="w-full hidden">
          <div id="datiMeteo" className="flex flex-col mb-8 w-3/5 sm:w-1/2 mx-auto"> 
            <img id="wth" src="" alt="" className="h-1/3"/>
            <h1 id="grade" className="text-5xl font-semibold mb-5 text-white"></h1>
            <h1 id="cityName" className="text-5xl font-semibold mb-5 text-white"></h1>
          </div>

          <div className="flex flex-col sm:flex-row w-3/5 sm:w-4/5 md:w-3/5 lg:w-full xl:flex-col 2xl:flex-row mx-auto items-center sm:justify-evenly align-middle " id="bottomPart">

            <div id="humidity" className="flex flex-row w-4/5 justify-center mb-8 sm:mb-0 xl:mb-8 2xl:mb-0 sm:w-1/2">
              <img src="images/humidity.png" alt="" className="h-1/2" id="hImg" />
              <div className="flex flex-col ml-4">
                <h1 className="text-white text-4xl mt-2" id="humidityData"></h1>
                <h1 className="text-gray-700 text-2xl" id="umidita">umidità</h1>
              </div>
            </div>

            <div id="wind" className="flex flex-row w-4/5 justify-center sm:w-1/2">
              <img src="images/wind.png" alt="" className="h-1/2" id="wImg" />
              <div className="flex flex-col ml-4">
                <h1 className="text-white h-full text-4xl mt-2" id="windData"></h1>
                <h1 className="text-gray-700 text-2xl" id="velocita">vento</h1>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default App
