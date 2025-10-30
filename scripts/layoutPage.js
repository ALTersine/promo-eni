const titreSite = nomPromo();

export function generatePage(pageName){
    const savedTheme = localStorage.getItem("theme")

    headerPage(pageName)
    themePage(savedTheme)
}

function nomPromo(){
    fetch('database/promo.json')
    .then(response=>response.json())
    .then(data=>{
        const nomPromo = data.infosPromo.nomPromo;
        const sousnomPromo = ` <small class="text-body-secondary">${data.infosPromo.sousnom}</small>`;
        $('#titreSite').text(nomPromo);
        $('#titreSite').append(sousnomPromo);
    })
}

//Tempalte du header des pages
function headerPage(page){
    //Built logo et titre de page
    const $logoEtTitre = $(`
        <img src="assets/logo.png" alt="Logo de l'école ENI" id="logoEni" class="header_img  col-md-3 col-xl-2 d-none d-sm-none d-md-block"> 
        
        <h1 id="titreSite" class="display-1 col-md-8 col-xl-6 flex-row align-self-center justify-content-evenly flex-wrap"><small class="text-body-secondary"></small></h1>`)

        //Ajout du nom de la promo au titre
        $logoEtTitre.find('h1').append(titreSite)

    $('#page-header').append($logoEtTitre)

    //Built bar de navigation
    let $menu = undefined
        if(page=="accueil"){
            //Menu actif à Accueil + fieldset de l'affichage liste ou carte
            $menu=$(`
                <span id="navigationAffichage" class="d-flex flex-row align-items-center justify-content- flex-nowrap col">
                    <div class="column">
                        <nav id="largeMediaNavigate" class="navbar">
                            <div class="container-fluid">
                                <ul class="nav nav-underline">
                                <li class="nav-item">
                                    <a href="index.html" id="homeNavigate" class="nav-link active" aria-current="page">Accueil</a>
                                </li>
                                <li class="nav-item">
                                    <a href="preferences.html" id="prefNavigate" class="nav-link">Préférences</a>
                                </li>
                                <li class="nav-item">
                                    <a href="carte.html" id="mapNavigate" class="nav-link">Carte</a>
                                </li>
                                <li class="nav-item">
                                    <a href="informations.html" id="infoNavigate" class="nav-link">Informations</a>
                                </li>
                                </ul>
                            </div>
                        </nav>
                    
                        <fieldset id="affichageListeCartes">
                            <legend class="d-flex justify-content-center align-items-center">Type affichage</legend>
                                <div class="form-check form-check-inline">
                                    <input type="radio" name="listeCartes" id="liste" class="form-check-input">
                                    <label for="liste" class="form-check-label">Liste</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input type="radio" name="listeCartes" id="cartes" class="form-check-input">
                                    <label for="cartes" class="form-check-label">Cartes</label>
                                </div>
                        </fieldset>
                    </div>
                </span>`)     
        } else if (page=="preferences"){
            //Menu actif à Préférences
            $menu = $(`
                <span id="navigationAffichage" class="d-flex flex-row align-items-center justify-content- flex-nowrap col">
                    <div class="column">
                        <nav id="largeMediaNavigate" class="navbar">
                        <div class="container-fluid">
                            <ul class="nav nav-underline">
                            <li class="nav-item">
                                <a href="index.html" id="homeNavigate" class="nav-link" aria-current="page">Accueil</a>
                            </li>
                            <li class="nav-item">
                                <a href="preferences.html" id="prefNavigate" class="nav-link active">Préférences</a>
                            </li>
                            <li class="nav-item">
                                <a href="carte.html" id="mapNavigate" class="nav-link">Carte</a>
                            </li>
                            <li class="nav-item">
                                <a href="informations.html" id="infoNavigate" class="nav-link">Informations</a>
                            </li>
                            </ul>
                        </div>
                        </nav>
                    </div>
                </span>`)
        } else if (page=="carte"){
            //Menu actif à Préférences
            $menu = $(`
                <span id="navigationAffichage" class="d-flex flex-row align-items-center justify-content- flex-nowrap col">
                    <div class="column">
                        <nav id="largeMediaNavigate" class="navbar">
                        <div class="container-fluid">
                            <ul class="nav nav-underline">
                            <li class="nav-item">
                                <a href="index.html" id="homeNavigate" class="nav-link" aria-current="page">Accueil</a>
                            </li>
                            <li class="nav-item">
                                <a href="preferences.html" id="prefNavigate" class="nav-link">Préférences</a>
                            </li>
                            <li class="nav-item">
                                <a href="carte.html" id="mapNavigate" class="nav-link active">Carte</a>
                            </li>
                            <li class="nav-item">
                                <a href="informations.html" id="infoNavigate" class="nav-link">Informations</a>
                            </li>
                            </ul>
                        </div>
                        </nav>
                    </div>
                </span>`)
        } else if (page=="informations"){
            //Menu actif à Préférences
            $menu = $(`
                <span id="navigationAffichage" class="d-flex flex-row align-items-center justify-content- flex-nowrap col">
                    <div class="column">
                        <nav id="largeMediaNavigate" class="navbar">
                        <div class="container-fluid">
                            <ul class="nav nav-underline">
                            <li class="nav-item">
                                <a href="index.html" id="homeNavigate" class="nav-link" aria-current="page">Accueil</a>
                            </li>
                            <li class="nav-item">
                                <a href="preferences.html" id="prefNavigate" class="nav-link">Préférences</a>
                            </li>
                            <li class="nav-item">
                                <a href="carte.html" id="mapNavigate" class="nav-link">Carte</a>
                            </li>
                            <li class="nav-item">
                                <a href="informations.html" id="infoNavigate" class="nav-link active">Informations</a>
                            </li>
                            </ul>
                        </div>
                        </nav>
                    </div>
                </span>`)
        }
    $('#page-header').append($menu)

}

export function themePage(theme){
    if(theme=="sombre"){
        $('html').attr('data-bs-theme', 'dark');
    } else {
        $('html').attr('data-bs-theme', 'light');
    }
}

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