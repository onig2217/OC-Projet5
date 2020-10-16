function validationForm() {

    var lastname = document.getElementById("lastname").value;
    var firstname = document.getElementById("firstname").value;
    var city = document.getElementById("city").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;
    var error_message = document.getElementById("error_message");
    error_message.innerHTML = "";
    //  /\d/.test(firstname)

    if(firstname.length <2 || firstname.length>30 || /\d/.test(firstname)){
        error_message.innerHTML += 
        `
        <div class="alert alert-danger" role="alert">
            Merci d'entrer un prénom valide
        </div>
        `;
        return false;
    }   
    if(lastname.length <2 || lastname.length>30 || /\d/.test(firstname)){
        error_message.innerHTML += 
        `
        <div class="alert alert-danger" role="alert">
            Merci d'entrer un nom valide
        </div>
        `;
        return false;
    }
    if(address.length <5 || address.length>250){
        error_message.innerHTML += 
        `
        <div class="alert alert-danger" role="alert">
            Merci d'entrer une adresse valide
        </div>
        `;
        return false;
    }
    if(city.length <2 || city.length>70 || /\d/.test(firstname)){
        error_message.innerHTML += 
        `
        <div class="alert alert-danger" role="alert">
            Merci d'entrer une ville valide
        </div>
        `;
        return false;
    }
    if(email.indexOf("@") == -1 || email.length <5 || email.indexOf(".") ==-1 || email.length >250){
        error_message.innerHTML += 
        `
        <div class="alert alert-danger" role="alert">
            Merci d'entrer un email valide
        </div>
        `;
        return false;
    }
    return true;
}

