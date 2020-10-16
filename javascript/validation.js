var infoFormulaire = localStorage.getItem("infoForm");
var prixTotal = localStorage.getItem("totalPrice");
var panier = localStorage.getItem("panier");
var orderId = localStorage.getItem("orderId");
infoFormulaire = JSON.parse(infoFormulaire);
prixTotal = JSON.parse(prixTotal);
panier = JSON.parse(panier);
orderId = JSON.parse(orderId);

// Btn retour à l'accueil si il manque des infos
if (panier == null || prixTotal == null || infoFormulaire == null ) {
    recap.innerHTML +=
    `
    <div class="card-body">  
        <a href="../index.html">
            <button class="btn btn-primary float-right" type="button">
                Retour à l'accueil
            </button>
        </a>
    </div>
    `
} else {
    // Numéro de commande
    const order = document.getElementById("order");
    order.innerHTML +=
    `
    <span class="font-weight-bold">N° de commande :</span> ${orderId[0].order}
    `
    // Récap du panier
    const recap = document.getElementById("recap");
    panier.forEach(article => {
    
        recap.innerHTML +=
        `
        <div class="card">
            <div class="row card-body text-center mb-3">
                <div class="col-xs-12 col-md-2 pb-3">${article.name}</div>
                <div class="col-xs-12 col-md-2 pb-3">${article.color}</div>
                <div class="col-xs-12 col-md-4 pb-3">${article.id}</div>
                <div class="col-xs-12 col-md-2 pb-3">${article.amount}</div>
                <div class="col-xs-12 col-md-2 pb-3">${(article.price/100).toFixed(2)}€</div>
            </div>
        </div>
        `
    });
    // Prix total
    prixTotal.forEach(prix => {

        recap.innerHTML +=
        `
        <div class="text-right my-5">
            <p class="pr-4 font-weight-bold">Prix total : ${(prix.price/100).toFixed(2)} €</p>
        </div>
        `
    });
    // Récap adresse de livraison
    infoFormulaire.forEach(info => {
    recap.innerHTML +=
    `
    <div class="col-12 card mx-auto mb-3">
        <div class="card-body">
            <h2 class="font-weight-bold text-center mb-5"> Adresse de facturation </h2>
            <div class="col mb-3"><span class="font-weight-bold pr-3">Nom :</span> ${info.nom}</div>
            <div class="col mb-3"><span class="font-weight-bold pr-3">Prénom :</span> ${info.prenom}</div>
            <div class="col mb-3"><span class="font-weight-bold pr-3">Email :</span> ${info.email}</div>
            <div class="col mb-3"><span class="font-weight-bold pr-3">Ville :</span> ${info.ville}</div>
            <div class="col mb-3"><span class="font-weight-bold pr-3">Adresse :</span> ${info.adresse}</div>
        </div>
    </div>
    `
    });
    localStorage.clear();
}



