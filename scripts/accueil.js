import { loadPrefAffichage } from "./prefe.js";
import { promo, listeApprenant, cartesAprrenant } from "./apprenants.js";

init();

function affichageAccueil(){
  const affichage = $('input[name="listeCartes"]:checked').attr('id');

    promo((data) => {
        if(affichage === 'liste'){
            listeApprenant(data);
        } else {
            cartesAprrenant(data);
        }
    });
}

function majPrefe(){
  $('#liste').change(()=>{
    affichageAccueil()
    if(confirm("Souhaitez-vous avoir l'affichage en liste par défaut ? (modifiable également sur la page Préférences)")){
      localStorage.setItem("affichage", "liste")
      loadPrefAffichage();
    }
  })

  $('#cartes').change(()=>{
    affichageAccueil()
    if(confirm("Souhaitez-vous avoir l'affichage en carte par défaut ? (modifiable également sur la page Préférences)")){
      localStorage.setItem("affichage", "cartes")
      loadPrefAffichage();
    }
  })
}

function init(){
  loadPrefAffichage();
  affichageAccueil()
  majPrefe();
}