import { mapping } from "./apprenants.js";
import { generatePage } from "./layoutPage.js";

const carte = L.map('carteLocalisation').setView([47.216671, -1.55], 8);
let apprenants = []
let bars = []
let checked = 0

generatePage("carte")
init()

function init(){
    //Initialisation de la carte
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://maps.stamen.com/terrain/copyright">Stamen</a>'
    }).addTo(carte);

    //Initialisation des maqueurs pour les apprenants
    mapping((data)=>{
        marqueurApprenant(data)
        formulaireRecherche("#nomApprenant",data)
    });

    //Initialisation pour les bar
    marqueurBar()

    //Evenemnts du fieldset Filtre Localisation
    checkChoice()
    checkAll(checkChoice)
}

//fonctions liées aux apprenants
function marqueurApprenant(tab){
    tab.forEach(apprenant => {
        const infos = L.popup({
            closeOnClick:false
        })
            .setLatLng([apprenant.latitude, apprenant.longitude],)
            .setContent(`${apprenant.nom_complet} est entrain d'apprendre le développement web ici.`)
            .openOn(carte);
            
        apprenants.push(infos);
    })
    afficherApprenants()
}

function afficherApprenants(){
    for(let i=0; i<apprenants.length; i++){
        apprenants[i].addTo(carte);
    } 
}

function retirerApprenants(){
    for(let i=0; i<apprenants.length; i++){
        apprenants[i].close();
    } 
}

//fonctions liés aux bars
function marqueurBar(){
    fetch('database/data.geojson').then(response=>response.json())
    .then(data=>{
        const features = data.features.map(feature=>({
                nom_complet: feature.properties.name,
                lattitude: feature.geometry.coordinates[1],
                longitude: feature.geometry.coordinates[0]
        }))
        features.forEach(BarProp=>{
        const localisation = L.circle([BarProp.lattitude, BarProp.longitude], {
            color: 'blue',
            fillColor: 'rgba(0, 38, 255, 0.36)',
            fillOpacity: 0.5,
            radius: 50,
        }).bindPopup(`Rendez-vous au ${BarProp.nom_complet}`)
        bars.push(localisation)
    })
    afficherBars()
    formulaireRecherche("#nomBar",features)
})
}

function afficherBars(){
    for(let i=0; i<bars.length; i++){
        bars[i].addTo(carte);
    }
}
function retirerBars(){
    for(let i=0; i<bars.length; i++){
        bars[i].remove();
    } 
}
        
//Fonctions du fieldset
function checkAll(cb){
    $('#affichageTouteLocalisation').change(()=>{
        if(checked==0){
            retirerApprenants();
            retirerBars();
            checked++
        }else{
            afficherApprenants();
            afficherBars();
            checked--
        }
        cb()
    })
}

function checkChoice(){
    if(checked==0){
        $('#filtreDetail').hide();
    }else {
        $('#filtreDetail').show();
        $('input[name="affichageDetailedlocalisation"]').on('change', function(){
            const filtre = $(this).val();
            if(filtre==="apprenants"){
                    afficherApprenants();
                    retirerBars();
            } else if (filtre==="bars"){
                retirerApprenants();
                afficherBars();
            } else {
                retirerApprenants();
                retirerBars();
            }
        })
    }
}

function formulaireRecherche(barRecherche,tab){
    tab.forEach(info=>{
        const option = $(`<option value="${info.nom_complet}">`)
        $(barRecherche).append(option)
    })
}