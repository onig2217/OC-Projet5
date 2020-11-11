const teddiesList = document.getElementById("teddies");

// On récupère les infos de l'API
var API = "http://localhost:3000/api/teddies";

// On affiche ce qu'on récupère de l'API
contactAPI(API).then(teddies => {
    teddies.forEach(teddy => {
        teddiesList.innerHTML += 
        `
        <div class="col-10 card mx-auto mb-3">
            <div class="card-body center-block">
                <img src="${teddy.imageUrl}" class="w-50" alt="image ourson">
                <h2 class="card-title my-3"> ${teddy.name} </h2>
                <p class="card-text"> ${teddy.description} </p>
                <p class="card-text"> ${teddy.price/100},00 euros </p>
                <a href="./views/produit.html?product=${teddy._id}" class="btn btn-primary">
                    Détails
                </a>
            </div>
        </div>
        `;
    });
});
