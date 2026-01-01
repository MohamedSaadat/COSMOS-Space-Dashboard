// ---------------- [0] sidebar ----------------------
// --------------- Initialization ------------------
var sidebar = document.getElementById("sidebar");
var sidebarToggleBTN = document.getElementById("sidebar-toggle");
var overlay = document.createElement("div");

// --------------- Event ---------------------------
sidebarToggleBTN.addEventListener("click", () => {
  sidebar.classList.add("sidebar-open");
  overlay.classList.add("sidebar-overlay");
  document.body.appendChild(overlay);
});
overlay.addEventListener("click", () => {
  sidebar.classList.remove("sidebar-open");
  overlay.remove();
});

// ---------------- [1] Today in Space -------------
function date(apiDate) {
  var myDate = new Date(apiDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return myDate;
}
// --------------- Initialization ------------------
var todayTAB = document.getElementById("todayTAB");
var todayTabBTN = document.getElementById("todayTabBTN");
var ViewFullResolutionBTN = document.getElementById("ViewFullResolution");
var apodImage = document.getElementById("apod-image");
var apodTitle = document.getElementById("apod-title");
var apodDate = document.getElementById("apod-date-detail");
var apodExplanation = document.getElementById("apod-explanation");
var apodCopyright = document.getElementById("apod-copyright");
var apodDateInfo = document.getElementById("apod-date-info");
var apodMediaType = document.getElementById("apod-media-type");
// --------------- API by ajax readystatechange -----
var todayHTTP = new XMLHttpRequest();
todayHTTP.open(
  "get",
  "https://api.nasa.gov/planetary/apod?api_key=Kyp02C9Jv6T28ojM4MYUy1to9tPdsdsOUsLtvPCo"
);
todayHTTP.send();
var todayArray = {};
todayHTTP.responseType = "json";
todayHTTP.addEventListener("readystatechange", () => {
  if (todayHTTP.readyState == 4) {
    todayArray = todayHTTP.response;
    apodImage.src = todayArray.hdurl;
    apodTitle.innerHTML = todayArray.title;
    apodDate.innerHTML = `<i class="far fa-calendar mr-2"></i>${date(
      todayArray.date
    )}`;
    apodExplanation.innerHTML = todayArray.explanation;
    apodCopyright.innerHTML = `&copy; ${todayArray.copyright}`;
    apodDateInfo.innerHTML = date(todayArray.date);
    apodMediaType.innerHTML = todayArray.media_type;
  }
});
// --------------- Event ---------------------------
todayTabBTN.addEventListener("click", () => {
  todayTAB.classList.remove("hidden");
  launchesTAB.classList.add("hidden");
  planetsTAB.classList.add("hidden");

  todayTabBTN.classList.add("bg-blue-500/10", "text-blue-400");
  todayTabBTN.classList.remove("text-slate-300", "hover:bg-slate-800");

  launchesTabBTN.classList.remove("bg-blue-500/10", "text-blue-400");
  launchesTabBTN.classList.add("text-slate-300", "hover:bg-slate-800");

  planetsTabBTN.classList.remove("bg-blue-500/10", "text-blue-400");
  planetsTabBTN.classList.add("text-slate-300", "hover:bg-slate-800");
});
ViewFullResolutionBTN.addEventListener("click", () => {
  window.open(apodImage.src, "_blank");
});
// ---------------- [2] Launches -------------------
function weekdayDate(apiDate) {
  var myDate = new Date(apiDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return myDate;
}
function time(apiTime) {
  var myTime = new Date(apiTime).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return myTime;
}
function allUpcomingLaunches() {
  var AllUpcomingLaunches = ``;
  for (let i = 1; i < launchesArray.results.length; i++) {
    // console.log(launchesArray.results[i].pad.location.image.image_url);
    AllUpcomingLaunches += `<!-- STATIC LAUNCH CARD ${i} -->
          <div
            class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer">
            <div class="relative h-48 bg-slate-900/50 flex items-center justify-center overflow-hidden">
              <img src="${
                launchesArray.results[i].pad.location.image.image_url
              }" alt="">
              <div class="absolute top-3 right-3">
                <span class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold">
                  ${launchesArray.results[i].status.abbrev}
                </span>
              </div>
            </div>
            <div class="p-5">
              <div class="mb-3">
                <h4 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  ${launchesArray.results[i].name}
                </h4>
                <p class="text-sm text-slate-400 flex items-center gap-2">
                  <i class="fas fa-building text-xs"></i>
                  ${launchesArray.results[i].launch_service_provider.name}
                </p>
              </div>
              <div class="space-y-2 mb-4">
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-calendar text-slate-500 w-4"></i>
                  <span class="text-slate-300">${date(
                    launchesArray.results[i].net
                  )}</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-clock text-slate-500 w-4"></i>
                  <span class="text-slate-300">${time(
                    launchesArray.results[i].net
                  )} UTC</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-rocket text-slate-500 w-4"></i>
                  <span class="text-slate-300">${
                    launchesArray.results[i].rocket.configuration.name
                  }</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                  <span class="text-slate-300 line-clamp-1">${
                    launchesArray.results[i].pad.location.name
                  }</span>
                </div>
              </div>
              <div class="flex items-center gap-2 pt-4 border-t border-slate-700">
                <button
                  class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold">
                  Details
                </button>
                <button class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                  <i class="far fa-heart"></i>
                </button>
              </div>
            </div>
          </div>`;
    launchesGrid.innerHTML = AllUpcomingLaunches;
  }
}
// --------------- Initialization ------------------
var launchesTAB = document.getElementById("launchesTAB");
var launchesTabBTN = document.getElementById("launchesTabBTN");
var launchesStatusAbbrev = document.getElementById("launchesStatusAbbrev");
var launchesName = document.getElementById("launchesName");
var launchServiceProviderName = document.getElementById(
  "launchServiceProviderName"
);
var rocketConfigurationName = document.getElementById(
  "rocketConfigurationName"
);
var launchDate = document.getElementById("launchDate");
var launchTime = document.getElementById("launchTime");
var launchLocation = document.getElementById("launchLocation");
var launchCountry = document.getElementById("launchCountry");
var launchMissionDescription = document.getElementById(
  "launchMissionDescription"
);
var launchImg = document.getElementById("launchImg");
var launchesGrid = document.getElementById("launches-grid");
// --------------- API by ajax load ---------------------
var launchesHTTP = new XMLHttpRequest();
launchesHTTP.open(
  "get",
  "https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10"
);
launchesHTTP.send();
var launchesArray = [];
launchesHTTP.responseType = "json";
launchesHTTP.addEventListener("load", () => {
  launchesArray = launchesHTTP.response;
  launchesStatusAbbrev.innerHTML = launchesArray.results[0].status.abbrev;
  launchesName.innerHTML = launchesArray.results[0].name;
  launchServiceProviderName.innerHTML =
    launchesArray.results[0].launch_service_provider.name;
  rocketConfigurationName.innerHTML =
    launchesArray.results[0].rocket.configuration.name;
  launchDate.innerHTML = weekdayDate(launchesArray.results[0].net);
  launchTime.innerHTML = `${time(launchesArray.results[0].net)} UTC`;
  launchLocation.innerHTML = launchesArray.results[0].pad.location.name;
  launchCountry.innerHTML = launchesArray.results[0].pad.country.name;
  launchMissionDescription.innerHTML =
    launchesArray.results[0].mission.description;
  launchImg.innerHTML = `<img src="${launchesArray.results[0].pad.location.image.image_url}" alt="">`;
  allUpcomingLaunches();
});

// --------------- Event ---------------------------
launchesTabBTN.addEventListener("click", () => {
  todayTAB.classList.add("hidden");
  launchesTAB.classList.remove("hidden");
  planetsTAB.classList.add("hidden");

  todayTabBTN.classList.remove("bg-blue-500/10", "text-blue-400");
  todayTabBTN.classList.add("text-slate-300", "hover:bg-slate-800");

  launchesTabBTN.classList.add("bg-blue-500/10", "text-blue-400");
  launchesTabBTN.classList.remove("text-slate-300", "hover:bg-slate-800");

  planetsTabBTN.classList.remove("bg-blue-500/10", "text-blue-400");
  planetsTabBTN.classList.add("text-slate-300", "hover:bg-slate-800");
});
// ---------------- [3] Planets --------------------
function selectedPlanet(index) {
  if (PlanetArray[index].moons == null) {
    planetMoons.innerHTML = 0;
  } else {
    planetMoons.innerHTML = PlanetArray[index].moons.length;
  }
  if (PlanetArray[index].discoveredBy != "") {
    planetDiscoverer.innerHTML = PlanetArray[index].discoveredBy;
  }
  if (PlanetArray[index].discoveryDate != "") {
    planetDiscoveryDate.innerHTML = PlanetArray[index].discoveryDate;
  }
}
function earth(index) {
  planetDetailImage.src = PlanetArray[index].image;
  planetDetailName.innerHTML = PlanetArray[index].englishName;
  planetDetailDescription.innerHTML = PlanetArray[index].description;
  planetDistance.innerHTML = `${(
    PlanetArray[index].semimajorAxis / 1000000
  ).toFixed(1)}M km`;
  planetRadius.innerHTML = `${Math.round(PlanetArray[index].meanRadius)} km`;
  planetMass.innerHTML = `${PlanetArray[index].mass.massValue} × 10^${PlanetArray[index].mass.massExponent} kg`;
  planetDensity.innerHTML = `${PlanetArray[index].density.toFixed(2)} g/cm³`;
  planetOrbitalPeriod.innerHTML = `${PlanetArray[index].sideralOrbit.toFixed(
    2
  )} days`;
  planetRotation.innerHTML = `${PlanetArray[index].sideralRotation.toFixed(
    2
  )} hours`;
  planetGravity.innerHTML = `${PlanetArray[index].gravity} m/s²`;
  planetBodyType.innerHTML = PlanetArray[index].bodyType;
  planetVolume.innerHTML = `${PlanetArray[index].vol.volValue} × 10^${PlanetArray[index].vol.volExponent} km³`;
  selectedPlanet(index);
  planetFacts.innerHTML = `
      <li class="flex items-start">
        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
        <span class="text-slate-300">Mass: ${
          PlanetArray[index].mass.massValue
        } × 10^${PlanetArray[index].mass.massExponent} kg</span>
      </li>
      <li class="flex items-start">
        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
        <span class="text-slate-300">Surface gravity: ${
          PlanetArray[index].gravity
        } m/s²</span>
      </li>
      <li class="flex items-start">
        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
        <span class="text-slate-300">Density: ${PlanetArray[
          index
        ].density.toFixed(2)} g/cm³</span>
      </li>
      <li class="flex items-start">
        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
        <span class="text-slate-300">Axial tilt: ${
          PlanetArray[index].axialTilt
        }°</span>
      </li>
      `;
      OrbitalCharacteristics.innerHTML = `
      <div class="flex justify-between items-center py-2 border-b border-slate-700">
        <span class="text-slate-400">Perihelion</span>
        <span id="planet-perihelion" class="font-semibold">${(
        PlanetArray[index].perihelion / 1000000
      ).toFixed(1)}M km</span>
      </div>
      <div class="flex justify-between items-center py-2 border-b border-slate-700">
        <span class="text-slate-400">Aphelion</span>
        <span id="planet-aphelion" class="font-semibold">${(
        PlanetArray[index].aphelion / 1000000
      ).toFixed(1)}M km</span>
      </div>
      <div class="flex justify-between items-center py-2 border-b border-slate-700">
        <span class="text-slate-400">Eccentricity</span>
        <span id="planet-eccentricity" class="font-semibold">${PlanetArray[index].eccentricity}</span>
      </div>
      <div class="flex justify-between items-center py-2 border-b border-slate-700">
        <span class="text-slate-400">Inclination</span>
        <span id="planet-inclination" class="font-semibold">${PlanetArray[index].inclination}°</span>
      </div>
      <div class="flex justify-between items-center py-2 border-b border-slate-700">
        <span class="text-slate-400">Axial Tilt</span>
        <span id="planet-axial-tilt" class="font-semibold">${PlanetArray[index].axialTilt}°</span>
      </div>
      <div class="flex justify-between items-center py-2 border-b border-slate-700">
        <span class="text-slate-400">Avg Temperature</span>
        <span id="planet-temp" class="font-semibold">${PlanetArray[index].avgTemp}°C</span>
      </div>
      <div class="flex justify-between items-center py-2">
        <span class="text-slate-400">Escape Velocity</span>
        <span id="planet-escape" class="font-semibold">${PlanetArray[index].escape} km/s</span>
      </div>
      `;
}
// --------------- Initialization ------------------
var planetsTAB = document.getElementById("planetsTAB");
var planetsTabBTN = document.getElementById("planetsTabBTN");
var planetsGrid = document.getElementById("planets-grid");
var planetCard = document.getElementsByClassName("planet-card");
var planetDetailImage = document.getElementById("planet-detail-image");
var planetDetailName = document.getElementById("planet-detail-name");
var planetDetailDescription = document.getElementById(
  "planet-detail-description"
);
var planetDistance = document.getElementById("planet-distance");
var planetRadius = document.getElementById("planet-radius");
var planetMass = document.getElementById("planet-mass");
var planetDensity = document.getElementById("planet-density");
var planetOrbitalPeriod = document.getElementById("planet-orbital-period");
var planetRotation = document.getElementById("planet-rotation");
var planetMoons = document.getElementById("planet-moons");
var planetGravity = document.getElementById("planet-gravity");
var planetDiscoverer = document.getElementById("planet-discoverer");
var planetDiscoveryDate = document.getElementById("planet-discovery-date");
var planetBodyType = document.getElementById("planet-body-type");
var planetVolume = document.getElementById("planet-volume");
var planetFacts = document.getElementById("planet-facts");
var OrbitalCharacteristics = document.getElementById("OrbitalCharacteristics");
// --------------- API by fetch -----------------------------
async function Planets() {
  var PlanetsHTTP = await fetch(
    "https://solar-system-opendata-proxy.vercel.app/api/planets"
  );
  var PlanetsHttpResponse = await PlanetsHTTP.json();
  return PlanetsHttpResponse.bodies;
}
var PlanetArray;
Planets().then((bodies) => {
  PlanetArray = bodies;
  var AllPlanetsGrid = ``;
  for (let i = 0; i < PlanetArray.length; i++) {
    AllPlanetsGrid += `
    <!-- ${PlanetArray[i].englishName} -->
          <div
            class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
            data-planet-id="mercury" style="--planet-color: #eab308" onmouseover="this.style.borderColor='#eab30880'"
            onmouseout="this.style.borderColor='#334155'">
            <div class="relative mb-3 h-24 flex items-center justify-center">
              <img class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                src=${PlanetArray[i].image} />
            </div>
            <h4 class="font-semibold text-center text-sm">${
              PlanetArray[i].englishName
            }</h4>
            <p class="text-xs text-slate-400 text-center">${(
              PlanetArray[i].semimajorAxis / 149598023
            ).toFixed(2)} AU</p>
          </div>
    `;
    if (PlanetArray[i].id === "terre") {
      console.log(PlanetArray[i].englishName);
      earth(i);
    }
  }
  planetsGrid.innerHTML = AllPlanetsGrid;
  var planetCardArray = [...planetCard];
  planetCardArray.forEach((card, i) => {
    card.addEventListener("click", () => {
      planetDetailImage.src = PlanetArray[i].image;
      planetDetailName.innerHTML = PlanetArray[i].englishName;
      planetDetailDescription.innerHTML = PlanetArray[i].description;
      planetDistance.innerHTML = `${(
        PlanetArray[i].semimajorAxis / 1000000
      ).toFixed(1)}M km`;
      planetRadius.innerHTML = `${Math.round(PlanetArray[i].meanRadius)} km`;
      planetMass.innerHTML = `${PlanetArray[i].mass.massValue} × 10^${PlanetArray[i].mass.massExponent} kg`;
      planetDensity.innerHTML = `${PlanetArray[i].density.toFixed(2)} g/cm³`;
      planetOrbitalPeriod.innerHTML = `${PlanetArray[i].sideralOrbit.toFixed(
        2
      )} days`;
      planetRotation.innerHTML = `${PlanetArray[i].sideralRotation.toFixed(
        2
      )} hours`;
      planetGravity.innerHTML = `${PlanetArray[i].gravity} m/s²`;
      planetBodyType.innerHTML = PlanetArray[i].bodyType;
      planetVolume.innerHTML = `${PlanetArray[i].vol.volValue} × 10^${PlanetArray[i].vol.volExponent} km³`;
      selectedPlanet(i);
      planetFacts.innerHTML = `
      <li class="flex items-start">
        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
        <span class="text-slate-300">Mass: ${
          PlanetArray[i].mass.massValue
        } × 10^${PlanetArray[i].mass.massExponent} kg</span>
      </li>
      <li class="flex items-start">
        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
        <span class="text-slate-300">Surface gravity: ${
          PlanetArray[i].gravity
        } m/s²</span>
      </li>
      <li class="flex items-start">
        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
        <span class="text-slate-300">Density: ${PlanetArray[i].density.toFixed(
          2
        )} g/cm³</span>
      </li>
      <li class="flex items-start">
        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
        <span class="text-slate-300">Axial tilt: ${
          PlanetArray[i].axialTilt
        }°</span>
      </li>
      `;
      OrbitalCharacteristics.innerHTML = `
      <div class="flex justify-between items-center py-2 border-b border-slate-700">
        <span class="text-slate-400">Perihelion</span>
        <span id="planet-perihelion" class="font-semibold">${(
        PlanetArray[i].perihelion / 1000000
      ).toFixed(1)}M km</span>
      </div>
      <div class="flex justify-between items-center py-2 border-b border-slate-700">
        <span class="text-slate-400">Aphelion</span>
        <span id="planet-aphelion" class="font-semibold">${(
        PlanetArray[i].aphelion / 1000000
      ).toFixed(1)}M km</span>
      </div>
      <div class="flex justify-between items-center py-2 border-b border-slate-700">
        <span class="text-slate-400">Eccentricity</span>
        <span id="planet-eccentricity" class="font-semibold">${PlanetArray[i].eccentricity}</span>
      </div>
      <div class="flex justify-between items-center py-2 border-b border-slate-700">
        <span class="text-slate-400">Inclination</span>
        <span id="planet-inclination" class="font-semibold">${PlanetArray[i].inclination}°</span>
      </div>
      <div class="flex justify-between items-center py-2 border-b border-slate-700">
        <span class="text-slate-400">Axial Tilt</span>
        <span id="planet-axial-tilt" class="font-semibold">${PlanetArray[i].axialTilt}°</span>
      </div>
      <div class="flex justify-between items-center py-2 border-b border-slate-700">
        <span class="text-slate-400">Avg Temperature</span>
        <span id="planet-temp" class="font-semibold">${PlanetArray[i].avgTemp}°C</span>
      </div>
      <div class="flex justify-between items-center py-2">
        <span class="text-slate-400">Escape Velocity</span>
        <span id="planet-escape" class="font-semibold">${PlanetArray[i].escape} km/s</span>
      </div>
      `;
    });

    card.addEventListener("mouseenter", () => {
      var dataPlanetId = card.getAttribute("data-planet-id");
      if (PlanetArray[i].id === dataPlanetId) {
        console.log("ok");
        card.setAttribute(
          "style",
          "--planet-color: #ef4444; border-color: rgba(239, 68, 68, 0.5);"
        );
      }
    });
  });
});
// --------------- Event ---------------------------
planetsTabBTN.addEventListener("click", () => {
  todayTAB.classList.add("hidden");
  launchesTAB.classList.add("hidden");
  planetsTAB.classList.remove("hidden");

  todayTabBTN.classList.remove("bg-blue-500/10", "text-blue-400");
  todayTabBTN.classList.add("text-slate-300", "hover:bg-slate-800");

  launchesTabBTN.classList.remove("bg-blue-500/10", "text-blue-400");
  launchesTabBTN.classList.add("text-slate-300", "hover:bg-slate-800");

  planetsTabBTN.classList.add("bg-blue-500/10", "text-blue-400");
  planetsTabBTN.classList.remove("text-slate-300", "hover:bg-slate-800");
});

/*
mercury
data-planet-id="mercury"
style="--planet-color: #eab308"
onmouseover="this.style.borderColor='#eab30880'"
---------------------------------------------------------------------------------------------------------------
venus
data-planet-id="venus"
style="--planet-color: #f97316"
onmouseover="this.style.borderColor='#f9731680'"
---------------------------------------------------------------------------------------------------------------
earth
data-planet-id="earth"
style="--planet-color: #3b82f6"
onmouseover="this.style.borderColor='#3b82f680'"
*/
