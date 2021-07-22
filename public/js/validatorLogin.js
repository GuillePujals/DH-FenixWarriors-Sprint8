window.onload = () => {
    const form = document.querySelector('form');
    const email = document.getElementById('email');
    const expValidEmail = /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/;
    const password = document.getElementById('password');
    let regularExpression  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,15}$/;

    let errors = {};


    //Valido información del email
    email.addEventListener('blur', () => {
    let feedback = ''; 
    let feedbackElement = document.getElementById('erroremail')
    //console.log(feedbackElement);
   
    if(email.value.trim() == ""){
        feedback = 'El e-mail no puede quedar vacío'
    } else if(!expValidEmail.test(email.value)){
        feedback = 'El formato de e-mail no es correcto'
    } 
    
    if (feedback) {
        feedbackElement.innerText = feedback
        errors.email = feedback;
    }else{
        feedbackElement.innerText = '';
        if (errors.email) {delete errors.email};
    }
    });

//Valido información del contraseña
password.addEventListener('blur', () => {
    let feedback = ''; 
    let feedbackElement = document.getElementById("errorpassword")
   
    if(password.value.trim() == ""){
        feedback = 'La contraseña no puede quedar vacío'
    } else if(!regularExpression.test(password.value)){
        feedback = 'La contraseña debe contener caracteres especiales números y letras mayúsculas y minúsculas'
    } 
    
    if (feedback) {
        feedbackElement.innerText = feedback;
        errors.password = feedback;
    }else{
        feedbackElement.innerText = '';
        if (errors.email) {delete errors.email};
    }
    });

}