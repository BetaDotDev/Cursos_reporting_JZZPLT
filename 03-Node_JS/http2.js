
/*
tresw.es@gmail.com
645154916
*/


/*
Protocolo MIME: Multipurpose Internet Mail Extensions
Tipos de content-type:
        Content-type: text/html
        Content-type: text/css
        Content-type: image/jpg
        Content-type: image/x-icon
        Content-type: audio/mpeg3
        Content-type: video/mp4
    Tipos MIME: https://www.sitepoint.com/mime-types-complete-list/
*/

// Declaracion de variables

const http = require('node:http'); // módulo de protocolos comunicaciones, HTTP
const fs = require('node:fs'); // módulo de filesystem
const mime = {
    'html': 'text/html',
    'css': 'text/css',
    'jpg': 'image/jpg',
    'ico': 'image/x-icon',
    'mp3': 'audio/mpeg3',
    'mp4': 'video/mp4',
}

// Lógica de negocio

const servidor = http.createServer((peticion,respuesta) => {
    // 1.- Lo que pedimos
    const url= new URL('http://localhost:8888' + peticion.url)
    // http://localhost:8888/imagenes/logo.jpg
    // a Node le interesa: /imagenes/logo.jpg

    //2.- Lo que voy buscando para cargar
    let camino = 'static' + url.pathname;

    if (camino === 'static/'){
        camino = 'static/index.html'; // si no me pide anda, me voy a index
    }

    // 3.- Y si... Stat para controlar si está o no en el archivo
    fs.stat(camino, error =>{
        if(!error){
            // no hay error, archivo encontrado ... Pues a leer!!
            fs.readFile(camino, (error,contenido)=>{
                if (error){
                    // error interno, el 500 de las...
                    respuesta.writeHead(500, {'content-type': 'text/plain'});
                    respuesta.write('Error interno que no conoce ni él');
                    respuesta.end() ;

                }
                else{
                    //¡¡archivo encontrado!!
                    const extension = camino.split('.').pop();
                    const mimeType = mime [extension] || 'text/plain';

                    /*
                    // Otra manera de hacerlo es: 
                    const mime = {
                        html:'text/html',
                        js: 'application/javascript',
                        png: 'image/png'...
                    
                    }
                    */ 
                    respuesta.writeHead(200, {'content-type': mimeType});
                    respuesta.write(contenido);
                    respuesta.end();
                }
            });
        }
        else{
            respuesta.writeHead(404, {'content-type': 'text/html'});
            respuesta.write('<h1></h1>');
            respuesta.end();
        
        }
    });

});
// Información para la consola
servidor.listen(8888);
console.log("servidor web iniciado http://localhost:8888")
