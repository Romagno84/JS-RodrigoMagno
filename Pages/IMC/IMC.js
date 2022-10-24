const peso = document.querySelector("#imc-peso");
const estatura = document.querySelector("#imc-estatura");
const resultado = document.querySelector("#imc-resultado");
const imcButton = document.querySelector("#imc-button");

imcButton.addEventListener('click', () => {
   if(peso.value && estatura.value){
       const alturaCalculo = estatura.value
       const imc =  (peso.value / (alturaCalculo * 2)).toFixed(1);
       if (imc >= 30) {
            resultado.innerHTML = `Tu IMC es ${imc}. Con tu peso actual estas dentro del rango Obecidad. Te invitamos a conocer nuestros Productos`;
       } else if (imc >= 25 && imc < 30){
            resultado.innerHTML = `Tu IMC es ${imc}. Con tu peso actual estas dentro del rango Sobrepeso. Te invitamos a conocer nuestros Productos`;
       } else if (imc >= 18.5 && imc < 25){
            resultado.innerHTML = `Tu IMC es ${imc}. Con tu peso actual estas dentro del rango Normal.Te invitamos a conocer nuestros Productos`
       } else {
            resultado.innerHTML = `Tu IMC es ${imc}. Con tu peso actual estas dentro del rango Bajo de Peso. Te invitamos a conocer nuestros Productos`
       }
       resultado.classList.add('show')
   }
})

