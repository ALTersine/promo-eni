import { loadPrefAffichage, loadPrefTheme } from "./scripts.js";
/**
 * Prévoir d'exporter la function qui afficher le bonne préf de tableau
 * Puis importer cette function dans le fichier accueil.js
 */

init()

//L’ensemble de ces préférences devra être stocké dans le "LocalStorage" quand on clique sur le bouton "Enregistrer".

$('#savePref').click(()=>{
    saveTheme();
    saveAffichage()   

    alert(`Merci, votre thème a été sauvegardé en ${saveTheme()} et la liste des apprenants en affichage de type ${saveAffichage() }`)

})

function saveTheme(){
    let theme = $('#theme').val()
    localStorage.setItem("theme",theme)

    return localStorage.getItem("theme")
}

function saveAffichage(){
    let affichage = $('input[type="radio"]:checked').attr('id')
    localStorage.setItem("affichage", affichage);

    return localStorage.getItem("affichage")
}

// A chaque nouvel affichage de la page "Préférences", les données du LocalStorage devront être proposées.
function init(){
    loadPrefTheme()
    loadPrefAffichage()
}