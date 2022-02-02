const express = require("express");
const app = express();
const PORT = 8080

app.set("view engine", "pug");
app.set('views','./views');
app.use(express.urlencoded({
    extended: true
    }))
app.use('/static', express.static('public'));




class productContainer {
    constructor( products ) {
        this.products = products;
    }

    getAll(){
        app.get('/products',  ( req,res )=>{
            if (this.products){
                res.render('datos.pug',{products: this.products})
            }
            else {
                res.send({error: "producto no encontrado"});
            }
        })
    }

    addProduct() {
        app.post('/products', async ( req,res )=>{
            const producto = req.body.producto;
            const precio = req.body.precio;
            const url = req.body.url;
            await this.products.push({
                id: this.products[this.products.length - 1].id + 1,
                title: producto,
                price: precio,
                url: url,
            })
            res.render('datos.pug',{products: this.products})
        })
    }
}

const contenedor = new productContainer([{ id: 0, title: "Coca", price: 200, url: "imgane de coca"}])

contenedor.getAll();
contenedor.addProduct();

app.listen(PORT)
