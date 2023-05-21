import { initStartCountries, loadCountry, newCountryByCode } from "./countryServer.js";

export default function declareEvents() {
    let parent = document.querySelector("#id_parent");
    let search_button = document.querySelector("#id_search_button");
    let search_input = document.querySelector("#id_search_value");
    let selectBox = document.querySelector("#id_select");
    let home = document.querySelector("#id_home");
    let Israel = document.querySelector("#id_Israel");
    let USA = document.querySelector("#id_USA");
    let France = document.querySelector("#id_France");
    let UK = document.querySelector("#id_UK");
    let thailand = document.querySelector("#id_thailand");


    Israel.addEventListener('click', () => {
        newCountryByCode("isr");
    })
    USA.addEventListener('click', () => {
        newCountryByCode("umi");
    })
    France.addEventListener('click', () => {
        newCountryByCode("fra");
    })
    UK.addEventListener('click', () => {
        newCountryByCode("gbr");
    })
    thailand.addEventListener('click', () => {
        newCountryByCode("tha");
    })
    search_button.addEventListener('click', (e) => {
        e.preventDefault();
        loadCountry(search_input.value);
    })
    home.addEventListener('click', () => {
        parent.innerHTML = "";
        initStartCountries();
    })
    selectBox.addEventListener('change', () => {
        if (selectBox.value != "0") {
            parent.innerHTML = "";
            loadCountry(selectBox.value);
        }
    })



}