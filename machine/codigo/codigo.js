var supercontador = -1;
var datosimagenes = []
var temporizador = ""
var datos;
var imagen = new Image();
var contexto
// Cargamos el contexto del lienzo 2
var contexto2
// Cargamos el contexto del lienzo 3
var contexto3 
// CContextos de las referencias
var contextovertical 
var contextohorizontal 
var contextodiagonal1 
var contextodiagonal2
var contextodiagonal3
var contextodiagonal4
var patrones = []
var cuentapatrones = []
window.onload = function(){
// Cargamos el contexto del lienzo 1
contexto = document.getElementById("lienzo").getContext("2d");
// Cargamos el contexto del lienzo 2
contexto2 = document.getElementById("lienzo2").getContext("2d");
// Cargamos el contexto del lienzo 3
contexto3 = document.getElementById("lienzo3").getContext("2d");
// CContextos de las referencias
contextovertical = document.getElementById("lienzovertical").getContext("2d");
contextohorizontal = document.getElementById("lienzohorizontal").getContext("2d");
contextodiagonal1 = document.getElementById("lienzodiagonal1").getContext("2d");
contextodiagonal2 = document.getElementById("lienzodiagonal2").getContext("2d");
contextodiagonal3 = document.getElementById("lienzodiagonal3").getContext("2d");
contextodiagonal4 = document.getElementById("lienzodiagonal4").getContext("2d");
// Patrones

patrones[0] = new Image();
patrones[0].src = "img/vertical.png";
patrones[1] = new Image();
patrones[1].src = "img/horizontal.png";
patrones[2] = new Image();
patrones[2].src = "img/diagonal1.png";
patrones[3] = new Image();
patrones[3].src = "img/diagonal2.png";
patrones[4] = new Image();
patrones[4].src = "img/diagonal3.png";
patrones[5] = new Image();
patrones[5].src = "img/diagonal4.png";

cuentapatrones[0] = 0
cuentapatrones[1] = 0
cuentapatrones[2] = 0
cuentapatrones[3] = 0
cuentapatrones[4] = 0
cuentapatrones[5] = 0

// Creo una nueva imagen en memoria de Javascript



fetch("../imagenes/json/imagenes.json")
.then(function(response){
        return response.json()
    })
.then(function(misdatos){
  
    datos = misdatos
    temporizador = setTimeout("bucle()",5000)
    
})
}
function bucle(){
    supercontador++;
    procesaImagen("../../imagenes/002-procesadas/"+datos[supercontador])
    clearTimeout(temporizador)
    temporizador = setTimeout("bucle()",5000)
}
function procesaImagen(miimagen){
    // Cargo una imagen que tengo en el disco duro
    imagen.src = "img/"+miimagen;
    // Me espero a que a imagen cargue, y entonces ejecuto esta función
    imagen.onload = function(){
        // Pinto las referencias
        contextovertical.drawImage(patrones[0],0,0)
        contextohorizontal.drawImage(patrones[1],0,0)
        contextodiagonal1.drawImage(patrones[2],0,0)
        contextodiagonal2.drawImage(patrones[3],0,0)
        contextodiagonal3.drawImage(patrones[4],0,0)
        contextodiagonal4.drawImage(patrones[5],0,0)
        // Primero pinto la imagen original en el lienzo original
        contexto.drawImage(imagen,0,0);
        // Detectamos bordes en la imagen
        // Primero cargamos la imagen 1 en memoria
        let imagenlienzo1 = contexto.getImageData(0,0,512,512);
        // Luego cargamos la imagen 2 en memoria
        let imagenlienzo2 = contexto2.getImageData(0,0,512,512);
        // Para cada uno de los pixeles de la imagen
        for(let i = 0;i<imagenlienzo1.data.length;i+=4){
            // Miro la diferencia del canal rojo con en horizontal
            let diferencia = Math.abs(imagenlienzo1.data[i] - imagenlienzo1.data[i+4])
            // Miro la diferencia del canal rojo en vertical
            let diferencia2 = Math.abs(imagenlienzo1.data[i] - imagenlienzo1.data[i+512*4])
            // En el caso de que la diferencia sea notable
            if(diferencia > 10 || diferencia2 > 10){
                // Pinto un pixel negro
                imagenlienzo2.data[i] = 0;
                imagenlienzo2.data[i+1] = 0;
                imagenlienzo2.data[i+2] = 0;
                imagenlienzo2.data[i+3] = 255;
            }else{
                // Pinto un pixel blanco
                imagenlienzo2.data[i] = 255;
                imagenlienzo2.data[i+1] = 255;
                imagenlienzo2.data[i+2] = 255;
                imagenlienzo2.data[i+3] = 255;
            }
        }
        // Por ultimo, pongo la imagen
        contexto2.putImageData(imagenlienzo2,0,0); 
        // Recorro esta imagen para vertical //////////////////////////////////////
        let muestravertical = contextovertical.getImageData(0,0,8,8)
        for(let x= 0;x<512;x++){
            for(let y= 0;y<512;y++){
                let trozo = contexto2.getImageData(x,y,8,8)
                let suma = 0;
                for(let i = 0;i<trozo.data.length;i+=4){
                    suma += Math.abs(trozo.data[i] - muestravertical.data[i])
                }
                if(suma < 4000){
                    cuentapatrones[0]++;
                    contexto3.fillStyle = "red";
                    contexto3.fillRect(x,y,2,2);
                }
            }
        }
        // Recorro esta imagen para horizontal //////////////////////////////////////
        let muestrahorizontal = contextohorizontal.getImageData(0,0,8,8)
        for(let x= 0;x<512;x++){
            for(let y= 0;y<512;y++){
                let trozo = contexto2.getImageData(x,y,8,8)
                let suma = 0;
                for(let i = 0;i<trozo.data.length;i+=4){
                    suma += Math.abs(trozo.data[i] - muestrahorizontal.data[i])
                }
                if(suma < 4000){
                    cuentapatrones[1]++;
                    contexto3.fillStyle = "blue";
                    contexto3.fillRect(x,y,2,2);
                }
            }
        }
        // Recorro esta imagen para diagonal1 //////////////////////////////////////
        let muestradiagonal1 = contextodiagonal1.getImageData(0,0,8,8)
        for(let x= 0;x<512;x++){
            for(let y= 0;y<512;y++){
                let trozo = contexto2.getImageData(x,y,8,8)
                let suma = 0;
                for(let i = 0;i<trozo.data.length;i+=4){
                    suma += Math.abs(trozo.data[i] - muestradiagonal1.data[i])
                }
                if(suma < 4000){
                    cuentapatrones[2]++;
                    contexto3.fillStyle = "green";
                    contexto3.fillRect(x,y,2,2);
                }
            }
        }
        // Recorro esta imagen para diagonal2 //////////////////////////////////////
        let muestradiagonal2 = contextodiagonal2.getImageData(0,0,8,8)
        for(let x= 0;x<512;x++){
            for(let y= 0;y<512;y++){
                let trozo = contexto2.getImageData(x,y,8,8)
                let suma = 0;
                for(let i = 0;i<trozo.data.length;i+=4){
                    suma += Math.abs(trozo.data[i] - muestradiagonal2.data[i])
                }
                if(suma < 4000){
                    cuentapatrones[3]++;
                    contexto3.fillStyle = "orange";
                    contexto3.fillRect(x,y,2,2);
                }
            }
        }

         // Recorro esta imagen para diagonal3 //////////////////////////////////////
        let muestradiagonal3 = contextodiagonal3.getImageData(0,0,8,8)
        for(let x= 0;x<512;x++){
            for(let y= 0;y<512;y++){
                let trozo = contexto2.getImageData(x,y,8,8)
                let suma = 0;
                for(let i = 0;i<trozo.data.length;i+=4){
                    suma += Math.abs(trozo.data[i] - muestradiagonal3.data[i])
                }
                if(suma < 4000){
                    cuentapatrones[4]++;
                    contexto3.fillStyle = "Magenta";
                    contexto3.fillRect(x,y,2,2);
                }
            }
        }

         // Recorro esta imagen para diagonal4 //////////////////////////////////////
        let muestradiagonal4 = contextodiagonal4.getImageData(0,0,8,8)
        for(let x= 0;x<512;x++){
            for(let y= 0;y<512;y++){
                let trozo = contexto2.getImageData(x,y,8,8)
                let suma = 0;
                for(let i = 0;i<trozo.data.length;i+=4){
                    suma += Math.abs(trozo.data[i] - muestradiagonal4.data[i])
                }
                if(suma < 4000){
                    cuentapatrones[5]++;
                    contexto3.fillStyle = "black";
                    contexto3.fillRect(x,y,2,2);
                }
            }
        }
        console.log(cuentapatrones)
        let total = 0;
        for(i = 0;i<cuentapatrones.length;i++){
            total += cuentapatrones[i]
        }
        for(i = 0;i<cuentapatrones.length;i++){
            cuentapatrones[i] /= total
        }
        console.log(cuentapatrones)
        let guarda = JSON.stringify(cuentapatrones)
        let patron = miimagen.split("-")
        let rutacompleta = miimagen
        let soloimagen = rutacompleta.split("/")[rutacompleta.split("/").length-1]
        let quitonumero = soloimagen.split("-")[1]
        let quitoextension = quitonumero.split(".")[0]
        
        fetch("guardajson.php?archivo="+soloimagen+"&patron="+quitoextension+"&datos="+guarda)
        
        function elegirimagen(){
            var fileInput = document.getElementById('fileInput');
    
            if (fileInput.files.length > 0) {
                var nuevaImagen = fileInput.files[0];

                procesaImagen(nuevaImagen)

            } else {
                console.log('No se seleccionó ninguna imagen.');
            }
        }

    }
}