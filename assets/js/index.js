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
// --------------- Initialization ------------------
var todayTAB = document.getElementById("todayTAB");
var todayTabBTN = document.getElementById("todayTabBTN");
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
// --------------- API -----------------------------

// ---------------- [2] Launches -------------------
// --------------- Initialization ------------------
var launchesTAB = document.getElementById("launchesTAB");
var launchesTabBTN = document.getElementById("launchesTabBTN");
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
// --------------- API -----------------------------

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
// --------------- API -----------------------------
var PlanetsHTTP = new XMLHttpRequest();
PlanetsHTTP.open(
  "get",
  "https://solar-system-opendata-proxy.vercel.app/api/planets"
);
PlanetsHTTP.send();
var PlanetsArray = [];
PlanetsHTTP.responseType = "json";
PlanetsHTTP.addEventListener("readystatechange", () => {
  if (PlanetsHTTP.readyState == 4) {
    PlanetsArray = PlanetsHTTP.response;
    // console.log(PlanetsArray);
  }
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
