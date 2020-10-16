const teddiesList = document.getElementById("teddies");

// On récupère les infos de l'API
var API = "http://localhost:3000/api/teddies";

async function produits(url) {
    let result = await fetch(url);
    return result.json();
}

// test 

/*async function contactAPI(url,object) {

    if (object == null) {
        let result = await fetch(url);
        return result.json();
    } else {
        fetch(url, { 
        method: 'post',
        headers: { "Content-type": "application/JSON; charset=UTF-8"},
        body: JSON.stringify(object) 
        })
        .then(function(response) {
            return response.json();
        })
        
    }
}*/

// On affiche ce qu'on récupère de l'API
produits(API).then(teddies => {
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
