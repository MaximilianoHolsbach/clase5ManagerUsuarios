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
        const file = fs.existsSync(this.#ruta); // fs.existsSync: devuelve true si el archivo existe. 
        if(file){
            this.#usuarios = JSON.parse(fs.readFileSync(this.#ruta, 'utf-8')); // fs.readFileSync: lee el archivo y devuelve el contenido en formato json
        }else{
            fs.writeFileSync(this.#ruta, JSON.stringify(this.#usuarios, null, 2)); // fs.writeFileSync: escribe en el archivo en formato json con formato de 2 espacios
        }
    }
    async addUsuario(nombre, apellido, edad, curso){
            try{
                const usuario = {
                    nombre: nombre,
                    apellido: apellido,
                    edad: edad,
                    curso: curso
                }
                this.#usuarios.push(usuario); // Agrega el usuario al array de usuarios
                const userFile = JSON.stringify(this.#usuarios, null, 2); // Convertimos el array de usuarios a JSON
                await writeFileAsync(this.#ruta, userFile, 'utf-8'); // Escribe el archivo con los usuarios
            }catch(error){
                return error.message;
            }
    }

    async getUsuarios(){
        try{
            if(this.#usuarios.length === 0) throw new Error('El array de usuarios está vacío');
            return this.#usuarios;
        }catch(error){
            return error.message;
        }
    }
}

const userManager = new UserManager()

userManager.init()
//userManager.addUsuario('Juan', 'Perez', 25, 'Fullstack')
//userManager.addUsuario('Ana', 'Gomez', 30, 'Backend')

console.log(userManager.getUsuarios())
