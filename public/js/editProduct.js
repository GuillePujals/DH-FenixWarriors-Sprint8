window.onload = function(){
    let form = document.querySelector('.form_edit');
    let address = document.querySelector('#address');
    let price = document.querySelector('#price');
    let n_people = document.querySelector('#n_people');
    let description = document.querySelector('#description');


    let acceptedExtensions = ['JPG', 'jpg', 'png', 'gif', 'jpeg'];
    let errors = [];

    address.addEventListener('blur', () => {    
        let feedback = ''; 
        let feedbackElement = address.nextElementSibling;

        if(address.value.trim() == ""){
            feedback = 'La dirección no puede quedar vacía'
        } else if(address.value.length < 2){
            feedback = 'La dirección debe tener 2 o mas caracteres'
        }

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
       
        if(price.value.trim() == ""){
            feedback = 'Debe completar el precio por noche'
        } else if(Number(price.value) <= 0 ){
            feedback = 'El precio debe ser mayor que cero'
        }

        if (feedback) {
            feedbackElement.innerText = feedback
            errors.price = feedback;
        } else {
            feedbackElement.innerText = '';
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


    form.addEventListener('submit', (e) => {
        errors = [];

        if (address.value == ''){
            errors.push('Complete la dirección');
            address.classList.add('is-invalida');
        }
        if (n_people.value == '' || Number(n_people.value) <= 0){
            errors.push('Ingrese número de personas');
            n_people.classList.add('is-invalida');
        }
        if (price.value == '' || Number(price.value) <= 0){
            errors.push('Ingrese el precio por noche');
            price.classList.add('is-invalida');
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