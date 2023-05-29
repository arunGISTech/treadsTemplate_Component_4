/* eslint-disable no-undef */
/**
 * Story maps
 */

// config map
let config = {
    minZoom: 4,
    maxZoom: 11,
    zoomControl: false, // zoom control off
  };
  // magnification with which the map will start
  const zoom = 4;
  // co-ordinates
  
  const lat = 17.096;
  const lng = 81.057;
  
  // calling map
  const map = L.map("map", config).setView([lat, lng], zoom);
  
  // Used to load and display tile layers on the map
  // Most tile servers require attribution, which you can set under `Layer`
  L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  // reactivate zoom at the desired location
  // [topleft, topright, bottomleft, bottomright]
  L.control.zoom({ position: "topright" }).addTo(map);
  
  // holder for all articles
  const articles = document.querySelectorAll("article");
  
  // setting a marker
  function setMarker([lat, lng], title) {
    const marker = L.marker([lat, lng], { title });
    // add a marker to the map and create a popup
    marker.addTo(map).bindPopup(title);
  }
  
  // map centering
  function centerMap([lat, lng], target, title, data_zoom) {
    const active = target.classList.contains("active");
  
    // set the map to lat coordinates, lng
    map.setView([lat, lng], data_zoom);
  
    // checking if the active class is already
    // set, if not, set the marker
    if (!active) {
      setMarker([lat, lng], title);
    }
  }
  
  // helper function to intersectionObserver
  function onChange(changes) {
    changes.forEach(function (change) {
      // get data from html coordinates element
      const data = change.target.dataset.coordinates;
      const data_zoom = change.target.dataset.zoom;
      // get title from html
      const title = change.target.dataset.title;
  
      if (change.intersectionRatio > 0.6) {
        // center map
        console.log(JSON.parse(data))
        centerMap(JSON.parse(data), change.target, title, data_zoom);
        // add class to article
        change.target.classList.add("active");
      }
    });
  }
  
  // checking if IntersectionObserver is supported
  if ("IntersectionObserver" in window) {
    const config = {
      root: null,
      rootMargin: "0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };
  
    let observer = new IntersectionObserver(onChange, config);
    articles.forEach(function (article) {
      observer.observe(article);
    });
  }
  