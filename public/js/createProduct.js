window.onload = function(){

    let form = document.querySelector('.form_edit');
    form.addEventListener('submit', (e) => {

        let errors = [];
        let address = document.querySelector('#address');
        let foto = document.querySelector('#foto');

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
        if (foto.value == ''){
            errors.push('Ingrese al menos una foto');
            foto.classList.add('is-invalida');
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