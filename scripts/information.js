init();

function init(){
    totalApprenants()
}

function totalApprenants(){
    fetch('promo.json')
    .then(response=>response.json())
    .then(data=>{
        const nbApprenants = data.apprenants.length;
        $('#nbApprenants').text(nbApprenants);
    })
}