import { getNameCountryByCode, loadCountry, newCountryByCode } from "./countryServer.js";


export default class CountryModule {
  constructor(_parents, _item) {
    this.parents = _parents;
    this.name = _item.name.common;
    this.amount = _item.population.toLocaleString();
    this.region = _item.region;
    this.capital = _item.capital;
    this.langusges = _item.languages ? Object.values(_item.languages) : "none";
    this.codeName = _item.cca3;
    this.flag = _item.flags.png?_item.flags.png:"../assets/images/flagDefult.jpg";
    this.map = _item.latlng;
    this.borders = _item.borders;
    this.cc3 = _item.cca3;
    this.population = _item.population;
    this.currencies = _item.currencies ? Object.keys(_item.currencies) : "none";

  }


  littleRender() {
    let div = document.createElement("div");
    div.className = "d-flex justify-content-center my-3 text-center";
    

    div.innerHTML =
      `
       <div class="card h-100" id="littlePrev" >
      <img src="${this.flag}" class="card-img-top shadow" width="100%" alt="${this.name}>
      <div class="card-body">
      <p class="card-text  m-0 p-3"><strong style="font-size: 25px;"> ${this.name}</strong></p>
      </div>
      </div>
    `
    document.querySelector(this.parents).append(div);
    document.querySelector("#id_parent").className = "row row-cols-lg-3 text-center";

    div.querySelector("#littlePrev").addEventListener('click', this.render.bind(this));

  }



  render() {

    document.querySelector(this.parents).innerHTML = "";
    let div = document.createElement("div");
    div.className = "";
    document.querySelector(this.parents).append(div);
    document.querySelector(this.parents).className = "row";

    div.innerHTML = `
    <div class="card col-9 bg-light my-3" style="margin: 0px auto;" data-aos="zoom-in" data-aos-delay="300">
    <div class=" card-body row d-md-flex p-0 justify-contect-lg-beetween">
    <div class="card-text col-md-6">
        <h1 class="card-header text-center">${this.name}</h1>
        <p class="card-text">Capital-City: ${this.capital}</p>
        <p class="card-text">currencies: ${this.currencies}</p>
        <p class="card-text">Population: ${this.population}</p>
        <p class="card-text" id="id_border">the naghbaires: <span id="border"></span></p>
        <p class="card-text">languege: ${this.langusges}</p>
    </div>
    <div class="col-md-5">
        <img src=${this.flag} alt=${this.name} style="width: 100%;heigh:100%">
    </div>
    <a href="./country.html" class="btn col-5  bg-info my-2 mx-auto">BACK TO HOME</a>
    <div class="map">
        <iframe class="mt-4 col-12" height="400"
            src="https://maps.google.com/maps?q=${this.map[0]},${this.map[1]}&z=7&ie=UTF8&iwloc=&output=embed"
            frameborder="0" scrolling="no" marginheight="0" marginwidth="0" loading="lazy"></iframe>;
    </div>
</div>
</div>
        

      
        `

    if (this.borders) {
      this.borders.forEach(async (item) => {
        let fullNmae = await getNameCountryByCode(item);
        let a = document.createElement("a")
        a.className = "btn text-info px-1"
        a.innerHTML = `${fullNmae}`
        document.querySelector("#border").append(a)
        a.addEventListener("click", () => {
          loadCountry(fullNmae);
        })
      });



    } else {
      document.querySelector("#border").innerHTML += `<div class="px-2 text-danger">none border</div>`
    }
  }




}