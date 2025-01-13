const buttonSearch = document.getElementById("buttonSearch");
const buttonClear = document.getElementById("buttonClear");
const inputSearch = document.getElementById("searchInput");
const bodyRecomendation = document.getElementById("body_recomendation");

function renderLocation(locations) {
  const locationHtml = locations.map(function (location) {
    return `<div class="recomendation">  
        <img class="img_recomendation" src="./img/imgRecomendation/${location.imagen}" />
           <div class="text_recomendation">
           <h2 class="title_recomendation">${location.name}</h2>
           <p class="p_recomendation">${location.description}</p>
           <button class="buton_recomendatio">Visit</button>
    </div>
    </div>`;
  });
  bodyRecomendation.innerHTML = locationHtml.join();
}

/* function clearRecomendations() {} */

function getLocations(rawData) {
  const locations = [];
  rawData.countries.forEach(function (country) {
    country.cities.forEach(function (city) {
      locations.push({
        category: "countries",
        name: city.name,
        description: city.description,
        imagen: city.imageUrl,
      });
    });
  });
  rawData.temples.forEach(function (temple) {
    locations.push({
      category: "temples",
      name: temple.name,
      description: temple.description,
      imagen: temple.imageUrl,
    });
  });
  rawData.beaches.forEach(function (beach) {
    locations.push({
      category: "beaches",
      name: beach.name,
      description: beach.description,
      imagen: beach.imageUrl,
    });
  });

  return locations;
}

fetch("./travel_recommendation_api.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonData) {
    //Todo el código debe ir acá
    //Bloque principal
    console.log(jsonData);
    const locations = getLocations(jsonData);
    console.log(locations);

    buttonSearch.addEventListener("click", function () {
      const search = inputSearch.value.toLowerCase().trim();
      inputSearch.value = "";
      const locationsFiltered = locations.filter(function (location) {
        if (
          location.category.toLowerCase().includes(search) ||
          location.name.toLowerCase().includes(search) ||
          location.description.toLowerCase().includes(search)
        ) {
          return true;
        } else {
          return false;
        }
      });

      buttonClear.addEventListener("click", function () {
        return (location = []);
      });
      console.log(locationsFiltered);

      renderLocation(locationsFiltered);
    });
  })
  .catch(function (error) {
    console.warn("Error al obtener los datos de las ubicaciones");
    console.error(error);
  });
