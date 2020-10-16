var panier = localStorage.getItem("panier");
const cart = document.getElementById("userCart");


if (panier !==null) {
    
    panier = JSON.parse(panier);
    var total = 0;
    var products = [];

    panier.forEach(teddy => {
        // On affiche les articles de notre panier
        cart.innerHTML +=
        `
        <div class="card">
            <div class="row card-body text-center mb-3 cartLign">
                <div class="col-xs-12 col-md-2 pb-3">${teddy.name}</div>
                <div class="col-xs-12 col-md-2 pb-3">${teddy.color}</div>
                <div class="col-xs-12 col-md-2 pb-3">${teddy.id}</div>
                <div class="col-xs-12 col-md-2 pb-3">${teddy.amount}</div>
                <div class="col-xs-12 col-md-2 pb-3">${(teddy.price/100).toFixed(2)}€</div>
                <div class="col-xs-12 col-md-2">
                    <button class="btn p-0 btnPlus" data-id="${teddy.id}" data-color="${teddy.color}" type="button">
                        <i class="far fa-plus-square"></i>
                    </button>
                    <button class="btn p-0 btnMinus" data-id="${teddy.id}" data-color="${teddy.color}" type="button">
                        <i class="far fa-minus-square"></i>
                    </button>
                    <button class="btn p-0 btnDelete" data-id="${teddy.id}" data-color="${teddy.color}" type="button">
                        <i class="far fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        </div>
        `
        total += (teddy.amount)*(teddy.price);
        products.push(teddy.id);
       
    });

    // On affiche le prix total du panier
    cart.innerHTML +=
    `
    <div class="card-body text-right font-weight-bold">
        Prix total : ${(total/100).toFixed(2)} €
    </div>
    `

    // Bouton pour incrémenter le nombre d'ourson
    var btnPlus = document.querySelectorAll('.btnPlus');
    Array.from(btnPlus).forEach(button => {
        button.addEventListener('click', function(event) {
            let id = button.getAttribute("data-id");
            let color = button.getAttribute("data-color");
            panier.forEach((article,i) =>{
                if(article.id==id && article.color==color){
                    panier[i].amount +=1;
                }
            })
            localStorage.setItem("panier",JSON.stringify(panier));
            document.location.reload();
        });
    });

    // Bouton pour décrémenter le nombre d'ourson
    var btnMoins = document.querySelectorAll('.btnMinus');
    Array.from(btnMoins).forEach(button => {
        button.addEventListener('click', function(event) {
            let id = button.getAttribute("data-id");
            let color = button.getAttribute("data-color");
            panier.forEach((article,i) =>{
                if(article.id==id && article.color==color && article.amount > 1){
                    panier[i].amount -=1;
                }
            })
            localStorage.setItem("panier",JSON.stringify(panier));
            document.location.reload();
        });
    });

    // Bouton pour supprimer un ourson
    var btnDelete = document.querySelectorAll('.btnDelete');
    Array.from(btnDelete).forEach(button => {
        button.addEventListener('click', function(event) {
            let id = button.getAttribute("data-id");
            let color = button.getAttribute("data-color");
            panier.forEach((article,i) =>{
                if(article.id==id && article.color==color){
                    panier.splice(i,1);
                    localStorage.setItem("panier",JSON.stringify(panier));
                }
                if (panier == "") {
                    localStorage.clear();
                } 
            })
            document.location.reload();
        });
    });
    
    //Formulaire pour passer commande
    const form = document.getElementById("formulaire");
    form.innerHTML +=
    `
    <form id="myform">
        <h3 class="mb-3">Informations</h3>
        <div class="form_group">
            <label for="firstname">
                Prénom
            </label>
            <input type="text" id="firstname" class="form-control">
        </div>
        <div class="form_group">
            <label for="lastname">
                Nom
            </label>
            <input type="text" id="lastname" class="form-control">
        </div>
        <div class="form_group">
            <label for="address">
                Adresse
            </label>
            <input type="text" id="address" class="form-control">
        </div>
        <div class="form_group">
            <label for="city">
                Ville
            </label>
            <input type="text" id="city" class="form-control">
        </div>
        <div class="form_group">
            <label for="email">
                E-mail
            </label>
            <input type="email" id="email" class="form-control">
        </div>
                        
        <div id="error_message" class="mt-3"></div>
    </form>
    `
    // Bouton pour valider la commande, ou continuer les achats
    const btnValidOrReturn = document.getElementById("validOrReturn");
    btnValidOrReturn.innerHTML +=
    `
    
    <div class="card-body row">
        <div class="col-xs-12 col-md-6 card-item btnvalid">
            <button id="btnValid" class="btn btn-success" type="button">
                Je valide
            </button>
        </div>
        <div class="col-xs-12 col-md-6 card-item text-right btnreturn">
            <a href="../index.html">
                <button class="btn btn-primary mt-responsive-3" type="button">
                    Retour à mes achats
                </button>
            </a>
        </div>
    </div>
    
    `

    // Btn de Validation de la commande et du formulaire
    const btnValid = document.getElementById("btnValid");
    btnValid.addEventListener('click', event => {
 
        if (validationForm() == true) {

            const contact = {
                firstName: firstname.value,
                lastName: lastname.value,
                address: address.value,
                city: city.value,
                email: email.value,
            }

            infoForm = [];
            infoForm.push({prenom: firstname.value, nom: lastname.value, adresse: address.value, ville: city.value, email: email.value});
            localStorage.setItem("infoForm", JSON.stringify(infoForm));
            totalPrice = [];
            totalPrice.push({price: total});
            localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
            var test = 0;
            let orderId = [];

            fetch('http://localhost:3000/api/teddies/order', { 
            method: 'post',
            headers: { "Content-type": "application/JSON; charset=UTF-8"},
            body: JSON.stringify({contact,products}) 
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                test = data.orderId;
                
                orderId.push({order: test});
                localStorage.setItem("orderId", JSON.stringify(orderId)); 
                document.location.href="../views/validation.html";
                
            })

            /*var API = "http://localhost:3000/api/teddies/order";
            
            contactAPI(API, {contact,products}).then(function(data) {
                
                var test = 0;
                let orderId = [];
                console.log(data);
                test = data.orderId;
                orderId.push({order: test});
                localStorage.setItem("orderId", JSON.stringify(orderId)); 
                //document.location.href="../views/validation.html";
                
            })*/
        }
    })

} else {
    
    // HTML si le panier est vide
    cart.innerHTML +=
    `
    <div  class="row card-body mb-3">
        <div class="text-center"> Votre panier est vide !</div>
    </div>
    <div class="card-body">  
        <a href="../index.html">
            <button class="btn btn-primary float-right" type="button">
                Retour à l'accueil
            </button>
        </a>
    </div>
    `
}


