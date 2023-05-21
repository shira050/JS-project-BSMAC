
import { fillSelectBox,initStartCountries,getCountries } from "./countryServer.js";
import declareEvents from "./declareEvent.js";
const init = () => {
    doApi();
    declareEvents();
}



const doApi = async () => {

    let url = "https://restcountries.com/v3.1/all";
    let data = await fetch(url)

    let jsonData = await data.json();
    jsonData = jsonData.filter(x => x.name.common != "Palestine");
    
    getCountries(jsonData);
    initStartCountries();
    fillSelectBox();

}

init();