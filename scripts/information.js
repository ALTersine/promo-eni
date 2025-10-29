import { nomPromo } from "./apprenants.js";

init();

function init(){
    totalApprenants()
    infoPromo()
    nomPromo()
}

function totalApprenants(){
    fetch('promo.json')
    .then(response=>response.json())
    .then(data=>{
        const nbApprenants = data.apprenants.length;
        $('#nbApprenants').text(nbApprenants);
    })
}

function infoPromo(){
    fetch('promo.json')
    .then(response=>response.json())
    .then(data=>{
        const description = data.infosPromo.description;
        $('#descriptionFormation').text(description);

        const dateDebut = new Date(data.infosPromo.dateDebut);
        $('#dateDebut').text(`${dateDebut.getDate()}/${dateDebut.getMonth()+1}/${dateDebut.getFullYear()}`);

        const dateFin = new Date(data.infosPromo.dateFin);
        $('#dateFin').text(`${dateFin.getDate()}/${dateFin.getMonth()+1}/${dateFin.getFullYear()}`);
    })
}