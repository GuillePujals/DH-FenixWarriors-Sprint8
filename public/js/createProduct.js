
window.onload = function(){
    let form = document.querySelector('.form_edit');
    let address = document.querySelector('#address');
    let foto1 = document.querySelector('#foto1');
    let foto2 = document.querySelector('#foto2');
    let foto3 = document.querySelector('#foto3');
    let price = document.querySelector('#price');
    let n_people = document.querySelector('#n_people');
    let description = document.querySelector('#description');
    let categ = document.querySelector('#categ');
    let destination = document.querySelector('#destination');
    console.log("Estoy aca");
   

    let acceptedExtensions = ['JPG', 'jpg', 'png', 'gif', 'jpeg'];
    let errors = [];

//Valido categoria
categ.addEventListener('blur', () => {    
        let feedback = ''; 
        let feedbackElement = categ.nextElementSibling;
       
        // console.log(feedbackElement);
        if(categ.value.trim() == ""){
            feedback = 'Debe seleccionar la categoría'
        } 
        // console.log(feedbackElement);

        if (feedback) {
            feedbackElement.innerText = feedback
            errors.categ = feedback;
        } else {
            feedbackElement.innerText = '';
        }
    });

    //Valido description
    description.addEventListener('blur', () => {    
        let feedback = ''; 
        let feedbackElement = description.nextElementSibling;
       
        // console.log(feedbackElement);
        if(description.value.length < 20){
            feedback = 'La descripción debe tener 20 o mas caracteres'
        } 
        // console.log(feedbackElement);

        if (feedback) {
            feedbackElement.innerText = feedback
            errors.address = feedback;
        } else {
            feedbackElement.innerText = '';
        }
    });

      //Valido información del imagenes
      foto1.addEventListener('blur', () => {
        let feedback = ''; 
        let feedbackElement = foto1.nextElementSibling;
        console.log(foto1);
       console.log("-----------------------");
        if(foto1){
            let filename = foto.value;
            let fileExtension = filename.split(".").pop();
            console.log(acceptedExtensions);
            console.log(fileExtension);
            console.log(acceptedExtensions.includes(fileExtension));
            if (!acceptedExtensions.includes(fileExtension)) {
                feedback = `Las extenciones de archivo permitidas son ${acceptedExtensions.join(', ')}`
                
            }
            
        }
        if (feedback) {
            feedbackElement.innerText = feedback;
            errors.foto = feedback;
    
        }else{
            feedbackElement.innerText = '';
            
            
        }
    });

    foto2.addEventListener('blur', () => {
        let feedback = ''; 
        let feedbackElement = foto2.nextElementSibling;
        console.log(foto2);
       console.log("-----------------------");
        if(foto2){
            let filename = foto2.value;
            let fileExtension = filename.split(".").pop();
            console.log(acceptedExtensions);
            console.log(fileExtension);
            console.log(acceptedExtensions.includes(fileExtension));
            if (!acceptedExtensions.includes(fileExtension)) {
                feedback = `Las extenciones de archivo permitidas son ${acceptedExtensions.join(', ')}`
                
            }
            
        }
        if (feedback) {
            feedbackElement.innerText = feedback;
            errors.foto2 = feedback;
    
        }else{
            feedbackElement.innerText = '';
            
            
        }
    });

    foto3.addEventListener('blur', () => {
        let feedback = ''; 
        let feedbackElement = foto3.nextElementSibling;
        console.log(foto3);
       console.log("-----------------------");
        if(foto3){
            let filename = foto3.value;
            let fileExtension = filename.split(".").pop();
            console.log(acceptedExtensions);
            console.log(fileExtension);
            console.log(acceptedExtensions.includes(fileExtension));
            if (!acceptedExtensions.includes(fileExtension)) {
                feedback = `Las extenciones de archivo permitidas son ${acceptedExtensions.join(', ')}`
                
            }
            
        }
        if (feedback) {
            feedbackElement.innerText = feedback;
            errors.foto3 = feedback;
    
        }else{
            feedbackElement.innerText = '';
            
        }
    });

    address.addEventListener('blur', () => {    
        let feedback = ''; 
        let feedbackElement = address.nextElementSibling;
       
        // console.log(feedbackElement);
        if(address.value.trim() == ""){
            feedback = 'La dirección no puede quedar vacía'
        } else if(address.value.length < 2){
            feedback = 'La dirección debe tener 2 o mas caracteres'
        }
        // console.log(feedbackElement);

        if (feedback) {
            feedbackElement.innerText = feedback
            errors.address = feedback;
        } else {
            feedbackElement.innerText = '';
        }
    });
    price.addEventListener('blur', () => {    
        let feedback = ''; 
        let feedbackElement = price.nextElementSibling;
       
        console.log(feedbackElement);
        if(price.value.trim() == ""){
            feedback = 'Debe completar el precio por noche'
        } else if(isNaN(price.value)){
            feedback = 'Este campo solo recibe caracteres numéricos'
        }else if(Number(price.value) <= 0 ){
            feedback = 'El precio debe ser mayor que cero'
        }
        // console.log(feedbackElement);

        if (feedback) {
            feedbackElement.innerText = feedback
            errors.price = feedback;
        } else {
            feedbackElement.innerText = '';
            // console.log(feedback);
        }
    });

    n_people.addEventListener('blur', () => {    
        
        let feedback = ''; 
        let feedbackElement = n_people.nextElementSibling;
       
        if(n_people.value.trim() == ""){
            feedback = 'Debe completar la capacidad'
        } else if(Number(n_people.value) <= 0 ){
            feedback = 'La capacidad debe ser mayor que cero'
        }

        if (feedback) {
            feedbackElement.innerText = feedback
            errors.n_people = feedback;
        } else {
            feedbackElement.innerText = '';
        }
    });

    //Valido destination
destination.addEventListener('blur', () => {    
    let feedback = ''; 
    let feedbackElement = destination.nextElementSibling;
   
    // console.log(feedbackElement);
    if(destination.value.trim() == ""){
        feedback = 'Debe seleccionar la ciudad'
    } 
    // console.log(feedbackElement);

    if (feedback) {
        feedbackElement.innerText = feedback
        errors.destination = feedback;
    } else {
        feedbackElement.innerText = '';
    }
});


    form.addEventListener('submit', (e) => {

        if (categ.value == ''){
            errors.push('Seleccione una categoría');
            categ.classList.add('is-invalida');
        }

        if (foto.value == "" && foto2.value == "" && foto3.value == ""){
            errors.push('Ingrese por lo menos 1 foto');
            foto.classList.add('is-invalida');
        }
        if (description.value.length < 20){
            errors.push('Ingrese una descripción de mas de 20 caracteres');
            description.classList.add('is-invalida');
        }

        if (address.value == ''){
            errors.push('Complete la dirección');
            address.classList.add('is-invalida');
        }
        if (n_people.value == ''){
            errors.push('Ingrese número de personas');
            n_people.classList.add('is-invalida');
        }
        if (price.value == ''){
            errors.push('Ingrese el precio por noche');
            price.classList.add('is-invalida');
        }
        if (destination.value == ''){
            errors.push('Seleccione una ciudad');
            destination.classList.add('is-invalida');
        }
  
        if (errors.length > 0){
            e.preventDefault();
            let ulErrors = document.querySelector('.errores');
            ulErrors.classList.add('alert-warning');
            ulErrors.innerHTML = '';
            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += `<li >  ${errors[i]} </li>`;
            };
            
        } else {
            form.submit();
        }
    });


}