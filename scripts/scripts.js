export function loadPrefAffichage(){
    let affichage = localStorage.getItem("affichage")

    if(affichage){
        if(affichage =="liste"){
            $('#liste').prop('checked', true)
        } else {
            $('#cartes').prop('checked', true)
        }
    }else{
        $('#liste').prop('checked', true)
    }
}


export function loadPrefTheme(){
    let theme = localStorage.getItem("theme")

    if(theme){
        $('#theme')
            .val(theme)
            .attr('selected')
    }

}