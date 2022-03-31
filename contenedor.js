const fs = require('fs');

class Contenedor {
    constructor (archivo) {
        this.archivo = archivo;
    }

    async save (Object){
        let productos = this.getAll()

        let newId = 1;
        if (productos.length > 1) {
            newId = productos[productos.length - 1].id + 1
        }
        let newProducto = { ...Object, id: newId }
        productos.push(newProducto)
        try {
            fs.writeFileSync(this.ruta, JSON.stringify(productos))
            return newId
        }   catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async getById(number) {
        let producto = this.getAll()
        let i = 0
        while (i < producto.length) {
            if (number==producto[i].id) {
                return producto[i]
            }
            else {
                i = i + 1
            }
        }
    }

    async getAll(){
        try{
            let productos = fs.readFileSync(`${this.archivo}`,'utf-8')
            return JSON.parse(productos);
        }catch(err){
            console.log(`Error al leer los productos: ${err}`)
            return [];
        }
    }

    async deleteById(id) {
        let productos = this.getAll()
        productos.splice(id - 1,1)
        this.archivo = fs.writeFileSync(this.archivo, JSON.stringify(productos))
    }

    async deleteAll(){
        
    }

}
productos = new Contenedor('products.txt')

function aleatorio(minimo,maximo){
    return Math.floor(Math.random() * ((maximo+1)-minimo)+minimo);
}
let aleatorio1 = aleatorio(1, 3)

const express = require('express');

const app = express();

app.get('/productos', (req, res) => {
     res.send(productos.getAll());
 });

app.get('/productoRandom', (req, res) => {
    res.send(productos.getById(aleatorio1));
});

const server = app.listen(8080, () => {
    console.log('servidor http en el puerto 8080');
});
