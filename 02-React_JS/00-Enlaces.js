// Enlace de los PDF: 

drive.google.com/drive/folders/1YZu7aVOKhZPd7HPSAUCzkxme9Ev1FZYg?usp=sharing

React no es un lenguaje sino una libreria basada en javascript para frontend.

JavaScript es un lenguaje de programacion interpretado y debilmente tipado.



// Programas requeridos

Instalar nodejs y con él se instala npm

NodeJS: https://nodejs.org/es
NPM: https://www.npmjs.com/

comandos para ver versiones:

npm --version
npm install -g npm@[version que quertemos]


// para montar el proyecto de react tenemos que irnos a la ruta padre del proyecto y copiar el sigueinte comando o seguir el enlace: 

// https://react.dev/learn/build-a-react-app-from-scratch

npm create vite@latest my-app -- --template react

// IMPORTANTE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
// 
/*

SUELE DAR EL SIGUIENTE ERROR: 
Pre-transform error: Failed to load url /src/main.jsx (resolved id: /src/main.jsx). Does the file exist?

Este error es porque la ruta es demasiado larga, pasa todo el proyecto a tu directorio raiz y lanzalo de nuevo
*/