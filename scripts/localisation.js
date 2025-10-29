import { mapping, nomPromo } from "./apprenants.js";

nomPromo();

const carte = L.map('carteLocalisation').setView([47.216671, -1.55], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://maps.stamen.com/terrain/copyright">Stamen</a>'
}).addTo(carte);

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