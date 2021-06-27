window.onload = function () {
    let servicios = document.querySelectorAll('.check')
    console.log(servicios);
    for(let i = 0; i < servicios.length; i++){
        servicios[i].addEventListener('click', function(event){
            event.preventDefault();
           });
    }
        
    
    
    
    }