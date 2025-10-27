promo();

//traitement des données pour l'accueil
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
        $('<td></td>').html(`<button type="button" class="btn btn-outline-info" id="detail_${apprenant.id}" data-bs-toggle="modal" data-bs-target="#detailModal">Détail</button>`).appendTo($tr)

        $tbody.append($tr);
    })
}

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
                    <button type="button" class="btn btn-outline-info" id="detail_${apprenant.id}" data-bs-toggle="modal" data-bs-target="#detailModal">Détail</button>
                </div>
                </div>
            </div>`)
        $cbody.append($carte);
    })
}