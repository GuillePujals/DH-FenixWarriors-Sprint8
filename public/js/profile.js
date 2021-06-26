window.onload = function () {
let intereses = document.querySelectorAll('.check')
console.log(intereses);
for(let i = 0; i < intereses.length; i++){
    intereses[i].addEventListener('click', function(event){
        console.log('hiciste click');
        event.preventDefault();
       });
}
    



}
