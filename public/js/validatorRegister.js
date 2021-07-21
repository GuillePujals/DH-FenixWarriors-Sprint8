window.onload = () => {
    
    const form = document.querySelector('form');
    const name = document.getElementById('name');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const avatar = document.getElementById('avatar');
    const password = document.getElementById('password');
    const expValidEmail = /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/;
    let regularExpression  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,15}$/;
    let acceptedExtensions = ['JPG', 'jpg', 'png', 'gif', 'jpeg'];

    let errors = {};
    
    
    
//Valido información del nombre
    name.addEventListener('blur', () => {    
        let feedback = ''; 
        let feedbackElement = name.nextElementSibling;
        
        console.log(feedbackElement);
        if(name.value.trim() == ""){
            feedback = 'El nombre no puede quedar vacío'
        } else if(name.value.length < 2){
            feedback = 'El nombre debe tener 2 o mas caracteres'
        }
        console.log(feedbackElement);
        //console.log(feedback);
        if (feedback) {
            feedbackElement.innerText = feedback
            errors.name = feedback;
            console.log(errors);
        }
        else{
            feedbackElement.innerText = '';
            if (name.phone) {delete errors.phone};
        }
        });
        
//Valido información del apellido
lastName.addEventListener('blur', () => {
    let feedback = ''; 
    let feedbackElement = lastName.nextElementSibling;
   
    if(lastName.value.trim() == ""){
        feedback = 'El apellido no puede quedar vacío'
    } else if(lastName.value.length < 2){
        feedback = 'El apellido debe tener 2 o mas caracteres'
    }
    
    if (feedback) {
        feedbackElement.innerText = feedback
        errors.lastName = feedback;
        
    }else{
        feedbackElement.innerText = '';
        if (lastName.phone) {delete errors.phone};
        
    }
    });

//Valido información del email
email.addEventListener('blur', () => {
    let feedback = ''; 
    let feedbackElement = email.nextElementSibling;
   
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
        if (errors.mail) {delete errors.mail};
    }
    });
    
    
//Valido información del contraseña
password.addEventListener('blur', () => {
    let feedback = ''; 
    let feedbackElement = password.nextElementSibling;
   
    if(password.value.trim() == ""){
        feedback = 'La contraseña no puede quedar vacío'
    } else if(!regularExpression.test(password.value)){
        feedback = 'La contraseña debe contener caracteres especiales números y letras mayusculas y minúsculas'
    } 
    
    if (feedback) {
        feedbackElement.innerText = feedback;
        errors.password = feedback;
    }else{
        feedbackElement.innerText = '';
        if (password.phone) {delete errors.phone};
    }
    });
    
    //Valido información del telefono
    phone.addEventListener('blur', () => {
    let feedback = ''; 
    let feedbackElement = phone.nextElementSibling;
    
    if(phone.value.trim() == ""){
        feedback = 'El teléfono no puede quedar vacío'
        
    } else if(isNaN(phone.value)){
        feedback = 'El telefono solo recibe caracteres numéricos'
    } else if(phone.value.length != 10){
        feedback = 'Completar el teléfono sin el 0 del cídigo de área y sin el 15'
    } 
    
    if (feedback) {
        feedbackElement.innerText = feedback;
        errors.phone = feedback;
    }else{
        feedbackElement.innerText = '';
        if (errors.phone) {delete errors.phone};
            
        }
    });

    //Valido información del imagen
    avatar.addEventListener('blur', () => {
    let feedback = ''; 
    let feedbackElement = avatar.nextElementSibling;
    
   
    if(avatar){
        let filename = avatar.value;
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
        errors.avatar = feedback;

    }else{
        feedbackElement.innerText = '';
        if (errors.avatar) {delete errors.avatar};
        
    }
})
       
       form.addEventListener('submit', function(e){
        
        //console.log(Object.keys(errors).length);
        if (Object.keys(errors).length > 0) {
            e.preventDefault();
            }
        if (name.value.trim() == ""){
                e.preventDefault();
                feedback = 'El nombre no puede quedar vacío'
                name.nextElementSibling.innerText = feedback;
           }
        if (lastName.value.trim() == ""){
            e.preventDefault();
            feedback = 'El apellido no puede quedar vacío'
            lastName.nextElementSibling.innerText = feedback;
       }
       if (email.value.trim() == ""){
            e.preventDefault();
            feedback = 'El e-mail no puede quedar vacío'
            email.nextElementSibling.innerText = feedback;
        }
        if (phone.value.trim() == ""){
            e.preventDefault();
            feedback = 'El celular no puede quedar vacío'
            phone.nextElementSibling.innerText = feedback;
        }
        if (password.value.trim() == ""){
            e.preventDefault();
            feedback = 'El celular no puede quedar vacío'
            password.nextElementSibling.innerText = feedback;
        }
       })
   

    
}
