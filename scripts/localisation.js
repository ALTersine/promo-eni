import { mapping } from "./apprenants.js";

var map = L.map('carteLocalisation').setView([47.216671, -1.55], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://maps.stamen.com/terrain/copyright">Stamen</a>'
}).addTo(map);

mapping((data)=>{
    marqueurApprenant(data)
});

function marqueurApprenant(tab){
    let marqueur = []
    tab.forEach(apprenant => {
        var popup = L.popup()
            .setLatLng([apprenant.latitude, apprenant.longitude])
            .setContent(`${apprenant.nom_complet} est entrain d'apprendre le développement web ici.`)
            .openOn(map);
        marqueur.push(popup);
    })
    for(let i=0; i<marqueur.length; i++){
        marqueur[i].addTo(map);
    }   
}

//var marker = L.marker([47.216671, -1.55]).addTo(map);

// function pingApprenant(tab){
//     tab.forEach(apprenant => {
//         var marker = L.marker([`${apprenant.latitude}, ${apprenant.longitude}`]).addTo(map);
//         marker.bindPopup(`${apprenant.nom_complet} est entrain d'apprendre le développement web ici.`).openPopup();
//     })
// }

// function visuTab(tab){
//     console.log(tab)
// }

// // initialize the map on the "map" div with a given center and zoom
// var map = new L.Map('carteLocalisation', {
//   center: new L.LatLng(47.216671, -1.55),
//   zoom: 15
// });

// // create a new tile layer
// var tileUrl = 'https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=<insert-your-apikey-here>',
/**Need an apiKey here !*/
// layer = new L.TileLayer(tileUrl, {maxZoom: 18});

// // add the layer to the map
// map.addLayer(layer);