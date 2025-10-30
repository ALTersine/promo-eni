import { mapping } from "./apprenants.js";
import { generatePage } from "./layoutPage.js";

generatePage("carte")

//Initialisation de la carte
const carte = L.map('carteLocalisation').setView([47.216671, -1.55], 8);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://maps.stamen.com/terrain/copyright">Stamen</a>'
}).addTo(carte);


//Affichage lié aux apprenants
mapping((data)=>{
    marqueurApprenant(data)
});

function marqueurApprenant(tab){
    let marqueur = []
    tab.forEach(apprenant => {
        const infos = L.popup()
            .setLatLng([apprenant.latitude, apprenant.longitude])
            .setContent(`${apprenant.nom_complet} est entrain d'apprendre le développement web ici.`)
            .openOn(carte);
        marqueur.push(infos);
    })
    for(let i=0; i<marqueur.length; i++){
        marqueur[i].addTo(carte);
    }   
}

//Affichage lié aux bars
function cleanData(cb){
    fetch('database/data.geojson').then(response=>response.json())
    .then(data=>{
        const features = data.features.map(feature=>({
                nom: feature.properties.name,
                lattitude: feature.geometry.coordinates[1],
                longitude: feature.geometry.coordinates[0]
        }))
        cb(features)
})
}

function marqueurBar(tab){
    let barometre = []
    tab.forEach(BarProp=>{
        const localisation = L.circle([BarProp.lattitude, BarProp.longitude], {
            color: 'blue',
            fillColor: 'rgba(0, 38, 255, 0.36)',
            fillOpacity: 0.5,
            radius: 500,
        }).bindPopup(`Rendez-vous au ${BarProp.nom}`)
        barometre.push(localisation)
    })
        
    for(let i=0; i<barometre.length; i++){
        barometre[i].addTo(carte);
    }
}


cleanData(marqueurBar)