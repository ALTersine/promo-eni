import { generatePage, themePage, loadPrefAffichage } from "./layoutPage.js";

generatePage("preferences");
init()

function init(){
    loadPrefAffichage()
    loadPrefTheme()
}

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

// A chaque nouvel affichage de la page "Préférences", les données du LocalStorage devront être proposées.
function saveAffichage(){
    let affichage = $('input[type="radio"]:checked').attr('id')
    localStorage.setItem("affichage", affichage);

    return localStorage.getItem("affichage")
}

function loadPrefTheme(){
    let theme = localStorage.getItem("theme")

    if(theme){
        $('#theme')
            .val(theme)
            .attr('selected')
    }

}

$('#theme').change(()=>{
    let pretheme = $('#theme').val()
    themePage(pretheme);
})