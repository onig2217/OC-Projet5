// On récupère les ID 
const descriptionproduit = document.getElementById("produit");
const test = document.getElementById("produitBottom");
const prix = document.getElementById("prix");
var colorTeddy = document.getElementById("choixCouleur");
let btnAddCart = document.getElementById("btnaddcart");

//on récupère l'id du produit de l'url
var urlParams = new URLSearchParams(window.location.search);
var IdProduit = urlParams.get("product");

contactAPI('http://localhost:3000/api/teddies/'+ IdProduit).then(teddy => {

    if ( IdProduit === teddy._id) {
        document.title = " L'ourson " + teddy.name;
        // On affiche le produit
        descriptionproduit.innerHTML +=
            `
            <h2 class="card-title text-center my-3"> ${teddy.name} </h2>
            <div class="text-center py-3">
                <img src="${teddy.imageUrl}" class="mb-3 w-75 h-auto border rounded-lg shadow" alt="image ourson">
            </div>
            <p class="card-text"> ${teddy.description}</p>
            <p class="card-text"> ${(teddy.price/100).toFixed(2)} euros</p>
            <p class="card-text">Référence : ${teddy._id}</p>
                    
            `
        // Choix de couleur de l'ourson
        colorTeddy.innerHTML +=
            `
            <option value="">Choix de couleur disponible:</option>
            `

        teddy.colors.forEach(color => {
            colorTeddy.innerHTML +=
                `
                    <option value="${color}">${color}</option>
                `
            ;
        })
    } else {
        test.innerHTML =
        `
        <div  class="row card-body mb-3">
            <div class="text-center"> Une erreur est survenue !</div>
        </div>
        <div class="card-body">  
            <a href="../index.html">
                <button class="btn btn-primary" type="button">
                    Retour à l'accueil
                </button>
            </a>
        </div>
                
        `
    ;    
    }
    
    // Event click pour ajouter un produit au panier
    btnAddCart.addEventListener('click', event => {
    
        var error_message = document.getElementById("error_color");
        const select = document.getElementById("choixCouleur");
        var colorOfTeddy = select.options[select.selectedIndex].value;
        var amountTeddies = 1;
        var panier = localStorage.getItem("panier");
           
        if (panier !== null){
            panier = JSON.parse(panier);
        } 
        else {
            panier = [];
        }

        if(colorOfTeddy === "") {
            text = "Merci de selectionner une couleur";
            error_message.innerHTML = text;
            return false;
        } else {
            panier.push({name: teddy.name, price: teddy.price, id: teddy._id, amount: amountTeddies, color: colorOfTeddy});
            console.log(panier);
            document.location.href="../views/panier.html";
            
        }
        localStorage.setItem('panier', JSON.stringify(panier));
    });
}) 


