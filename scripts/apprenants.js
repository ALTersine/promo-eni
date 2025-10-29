//traitement des données liés aux apprenants
export function promo(cbAffichage){
fetch('promo.json')
    .then(response=>response.json())
    .then(data=>{
        const infoAccueil = data.apprenants.map(apprenant=>({
            id: apprenant.id,
            nom: apprenant.nom,
            prenom: apprenant.prenom,
            ville: apprenant.ville
        }))

        cbAffichage(infoAccueil)

        modalApprenantDetail(data.apprenants)
    })
}

//affichage en tableau
export function listeApprenant(tab){
    $('#titreTableau').text("Liste des apprenants")
    $('.table').show()
    $('#cartesApprenants').hide()
    const $tbody = $('table tbody')
    $tbody.empty()

    tab.forEach(apprenant => {
        const $tr = $('<tr></tr>')

        $('<td></td>').text(apprenant.id).appendTo($tr)
        $('<td></td>').text(apprenant.nom).appendTo($tr)
        $('<td></td>').text(apprenant.prenom).appendTo($tr)
        $('<td></td>').text(apprenant.ville).appendTo($tr)
        $('<td></td>').html(`<button type="button" class="btn btn-outline-info" id="detail_${apprenant.id}" data-bs-toggle="modal" data-bs-target="#detailModal${apprenant.id}">Détail</button>`).appendTo($tr)

        $tbody.append($tr);
    })
}

//affichage en cartes
export function cartesAprrenant(tab){
    $('#titreTableau').text("Carte des apprenants")
    $('.table').hide()
    $('#cartesApprenants')
        .empty()
        .show()

    const $cbody = $('#cartesApprenants')

    tab.forEach(apprenant => {
        const $carte = $(`
            <div class="col-sm-3" id="carteApprenant${apprenant.id}" style="margin-bottom:2%">
                <div class="card d-flex align-items-center">
                <div class="card-body" style="text-align: center;">
                    <h5 class="card-title" id="carteTitre">${apprenant.id} ${apprenant.nom} ${apprenant.prenom}</h5>
                    <p class="card-text" id="carteInfo">${apprenant.ville}</p>
                    <button type="button" class="btn btn-outline-info" id="detail_${apprenant.id}" data-bs-toggle="modal" data-bs-target="#detailModal${apprenant.id}">Détail</button>
                </div>
                </div>
            </div>`)
        $cbody.append($carte);
    })
}

//traitement des données pour la carte
export function mapping(cbLocalisation){
fetch('promo.json')
    .then(response=>response.json())
    .then(data=>{
        const infoCarte = data.apprenants.map(apprenant=>({
            nom_complet: `${apprenant.nom} ${apprenant.prenom}`,
            latitude: apprenant.coordonnees.latitude,
            longitude: apprenant.coordonnees.longitude,
        }))

        cbLocalisation(infoCarte)
    })

}

function modalApprenantDetail(tab){
    $('#modalDesApprenants').empty()

    tab.forEach(apprenant =>{

    //Les éléments pour l'image
        const $img = $('<img>', {
            src: `assets/apprenants/${apprenant.avatar}`,
            alt: `Avatar de ${apprenant.nom} ${apprenant.prenom}`,
            id: `imgModal${apprenant.id}`,
            style: 'width: 80%;'
        })

    //erreur = on prend l'image src par défaut
        $img.on('error', function(){
            $(this).attr('src', 'assets/avatar.png')
        })
    
    //génération de tous les modals
        const $modal = $(`
                <div class="modal fade" id="detailModal${apprenant.id}" tabindex="-1" aria-labelledby="modalDesApprenants" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body container">
                    <div class="row">
                        <div class="col-3" id="imgModalDiv">
                        </div>
                        <div class="col-9">
                            <div class="row" id="rowNom">
                                <div class="col-8">
                                Nom
                                </div>
                                <div class="col-4" id="nomModal">
                                ${apprenant.nom}
                                </div>
                            </div>
                            <div class="row" id="rowPrenom">
                                <div class="col-8">
                                Prénom
                                </div>
                                <div class="col-4" id="prenomModal">
                                ${apprenant.prenom}
                                </div>
                            </div>
                            <div class="row" id="rowVille">
                                <div class="col-8">
                                Ville
                                </div>
                                <div class="col-4" id="villeModal">
                                ${apprenant.ville}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="anecdote">
                        <legend id="anecdoteApprenant">Anecdotes sur l'apprenant : </legend>
                        <div id="anecdoteModal">${apprenant.anecdotes.join('<br>')}</div>
                    </div>
                </div>
                <div class="modal-footer">
                </div>
                </div>
            </div>
            </div>`)

    //Ajout image
    $modal.find('#imgModalDiv').append($img)

    //built complet
    $('#modalDesApprenants').append($modal)

    //clic pour l'afficher
    $(`#detailModal${apprenant.id}`).on('shown.bs.modal', function () {
        $(`#modal_${apprenant.id}`).focus()
    });
})
}

export function nomPromo(){
    fetch('promo.json')
    .then(response=>response.json())
    .then(data=>{
        const nomPromo = data.infosPromo.nomPromo;
        const sousnomPromo = ` <small class="text-body-secondary">${data.infosPromo.sousnom}</small>`;
        $('#titreSite').text(nomPromo);
        $('#titreSite').append(sousnomPromo);
    })
}