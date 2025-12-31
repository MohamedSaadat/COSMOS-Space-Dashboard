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
    apodImage.src =
      "https://apod.nasa.gov/apod/image/2512/ArtificialComet_Chao_1080.jpg";
    apodImage.setAttribute(
      "src",
      "https://apod.nasa.gov/apod/image/2512/ArtificialComet_Chao_1080.jpg"
    );
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
    AllUpcomingLaunches += `<!-- STATIC LAUNCH CARD ${i} -->
          <div
            class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer">
            <div class="relative h-48 bg-slate-900/50 flex items-center justify-center">
              <i class="fas fa-space-shuttle text-5xl text-slate-700"></i>
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
                  <span class="text-slate-300">${date(launchesArray.results[i].net)}</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-clock text-slate-500 w-4"></i>
                  <span class="text-slate-300">${time(launchesArray.results[i].net)} UTC</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-rocket text-slate-500 w-4"></i>
                  <span class="text-slate-300">${launchesArray.results[i].rocket.configuration.name}</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                  <span class="text-slate-300 line-clamp-1">${launchesArray.results[i].pad.location.name}</span>
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
  launchImg.innerHTML = `<img src="assets/images/launch-placeholder.png" alt="">`;
  allUpcomingLaunches()
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
// --------------- Initialization ------------------
var planetsTAB = document.getElementById("planetsTAB");
var planetsTabBTN = document.getElementById("planetsTabBTN");
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
// --------------- API by fetch -----------------------------
async function Planets() {
  var PlanetsHTTP = await fetch(
    "https://solar-system-opendata-proxy.vercel.app/api/planets"
  );
  var PlanetsHttpResponse = await PlanetsHTTP.json();
}
Planets();

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
