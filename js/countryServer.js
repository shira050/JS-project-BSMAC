import CountryModule from "./countryClass.js";

const initCountries_arr = [
    "israel",
    "united states",
    "france",
    "united kingdom",
    "thailand",
    "china"
];
let countries_arr = [];


//פונקציות איתחול מערכים ושליפה
export const getCountries = (_data) => {
    countries_arr = _.sortBy(_data, "name.common");
}
export const initStartCountries = () => {
    document.querySelector("#id_load").className = "d-none";
    let tmp = [];
    tmp = countries_arr.filter(x => initCountries_arr.includes((x.name.common).toLowerCase()));
    tmp.forEach(element => {
        let country = new CountryModule("#id_parent", element, initCountries_arr);
        country.littleRender();
    });

}
export const fillSelectBox = () => {
    let select = document.querySelector("#id_select");
    countries_arr.forEach(item => {
        select.innerHTML += `
        <option value="${item.name.common}">${item.name.common}</option>
        `
    });

}


//פונקציות שליפת מדינה ספיציפית ע"י קוד או שם
export const loadCountry = (_name) => {
    document.querySelector("#id_parent").innerHTML = "";
    let countryInclude = countries_arr.filter(x => x.name.common.toLowerCase().includes(_name.toLowerCase()));

    if (countryInclude.length > 1) {
        countryInclude.forEach(item => {
            let c = new CountryModule("#id_parent", item, initCountries_arr, getNameCountryByCode,);
            c.littleRender();
        })
    }
    else if (countryInclude.length == 1) {
        countryInclude.forEach(item => {
            let c = new CountryModule("#id_parent", item, initCountries_arr, getNameCountryByCode,);
            c.render();
        })
    }
    else {
        document.querySelector("#id_parent").innerHTML =
            `  <div class="alert alert-warning alert-dismissible fade show my-5 mx-auto ">
            <strong>Warning!</strong>         
            <h2>The Country ${_name} is not found</h2>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            <a href="./index.html" class="btn col-5 border  my-2 mx-auto">BACK TO HOME</a>

            </div>
            
              
           

            `
    }
    document.querySelector("#id_load").classList.add("d-none");
}

export const newCountryByCode = (_code) => {
    debugger
    document.querySelector("#id_parent").innerHTML = "";
    let countryIncludeCode = countries_arr.filter(x => ((x.cca3).toLowerCase()).includes(_code));
    if (_code == "" || _code == " ") {
        alert("empty");

    }
    else if (countryIncludeCode.length > 0) {
        countryIncludeCode.forEach(item => {
            let c = new CountryModule("#id_parent", item, initCountries_arr, newCountryByCode,);
            c.render();
        })
    }
    else {
        document.querySelector("#id_parent").innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show my-5 mx-auto ">
        <strong>Warning!</strong>         
        <h2>The Country ${_code} is not found</h2>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <a href="./index.html" class="btn col-5 border  my-2 mx-auto">BACK TO HOME</a>

        </div>
        
        `
    }
    document.querySelector("#id_load").classList.add("d-none");
}




export const getNameCountryByCode = async (_codeCountry) => {
    //אופצייה בקריאה לשרת
    // const data = await fetch(`https://restcountries.com/v3.1/alpha/${_codeCountry}`)
    // const jsonData = await data.json();


    //אופצייה ב בלי קריאה לשרת.
    let jsonData = countries_arr.filter(x => x.cca3.toLowerCase().includes(_codeCountry.toLowerCase()));
    console.log(jsonData[0].name.common);
    return jsonData[0].name.common;
}




