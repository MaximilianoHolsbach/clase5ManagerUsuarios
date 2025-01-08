const fs = require('fs');
const path = require('path');
const {promisify} = require('util');// promisify: convierte una función que usa callbacks en una función que devuelve una promesa
const writeFileAsync = promisify(fs.writeFile);// Convierte la función fs.writeFile en una función que devuelve una promesa 

class UserManager{
    #ruta = path.join(__dirname, 'usuarios.json');
    #usuarios = [];
    constructor(){
        this.init();
    }
    init(){

    }
}