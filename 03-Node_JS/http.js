/*
// Esta parte está mal

const http = require(`node:http`);

// writeHead: http.ServerResponse, establecemos el codigo de estado del 
const servidor = http.createServer((ProcessingInstruction, respuesta) => {
    respuesta.whriteHead(200,{'content-type': 'tect/html'})
    respuesta.write(
        <!doctype html>
        <html>
        <head></head>
        <body><h1>Site en desarrollo</h1></body>
        </html>
        );
    respuesta.end();

    // Main
    servidor.listen(8888);
    console.log('Server iniciado y funcionando');

});

*/


// Esta parte está bien
const http = require('node:http');

// writeHead: http.ServerResponse, establecemos el codigo de estado del 
const servidor = http.createServer((ProcessingInstruction, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(`
        <!doctype html>
        <html>
        <head></head>
        <body><h1>Site en desarrollo</h1></body>
        </html>
    `);
    response.end();
});

// Main
servidor.listen(8888);
console.log('Server iniciado y funcionando');
