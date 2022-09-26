let nombre = prompt('Hola Bienvenid@s a Vianda y Nutricion... Cual es tu nombre?');
    alert(`Hola ${nombre}... Antes que nada nos gustaría conocerte mejor para hacer un plan acorde a tus características`);

let correcto;
let edad;
let medida;
let peso;

do {
    edad = prompt (`Cual es tu Edad?`);
    medida = parseFloat(prompt(`Cuanto medis en centimetros?`));
    peso = parseFloat(prompt(`Cuanto Pesas?`));
    alert (`Tienes ${edad} años, medis ${medida} y pesas ${peso} Kg.` );
    correcto = prompt(`Son correcto los datos ingresados?`);
    
} while (correcto.toLowerCase() !== `si`);
    alert(`Sigamonos conociendo.En base a tus datos vamos a calcular tu Indice de Masa Corporal`);

function imc(peso, medida) {
    const alturaCalculo = medida * 0.01 
    const resultado = peso / (alturaCalculo * 2);
    if (resultado >= 30) {
        alert(`Con tu peso actual estas dentro del rango Obecidad. Te invitamos a conocer nuestros Productos`);
    } else if (resultado >= 25 && resultado < 30){
        alert(`Con tu peso actual estas dentro del rango Sobrepeso. Te invitamos a conocer nuestros Productos`);
    } else if (resultado >= 18.5 && resultado < 25){
        alert(`Con tu peso actual estas dentro del rango Normal.Te invitamos a conocer nuestros Productos`);
    } else {
        alert(`Con tu peso actual estas dentro del rango Bajo de Peso. Te invitamos a conocer nuestros Productos`);
    }
} 

imc(peso, medida);