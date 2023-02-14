const fs = require("fs");

class ProductManager {
    constructor(){
        this.path = "./products.js"
        this.products = []
    }

    static id = 0

    /* METODOS */
    //------------------------ 

    addProduct = async (title,description,price,thumbnail,code,stock) => {

        ProductManager.id++

        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id
        }

        this.products.push(newProduct)

        await fs.promises.writeFile(this.path, JSON.stringify(this.products))
    }

    readProducts = async () => {
        let firstresponse = await fs.promises.readFile(this.path , "utf-8")

        return JSON.parse(firstresponse)
         
    }

    getProducts = async () => {
        let secondresponse = await this.readProducts()
        return console.log(secondresponse)
        

    }

    getProductsById = async (id) => {
        let thirdresponse = await this.readProducts()

        let filter = thirdresponse.find(product => product.id === id)

        console.log(filter)

    }

    deleteProductsById = async (id) =>{
        let thirdresponse = await this.readProducts()
        let productFilter = thirdresponse.filter(products => products.id != id)

        await fs.promises.writeFile(this.path, JSON.stringify(productFilter))


    }

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductsById(id)

        let oldProduct = await this.readProducts()

        let modifiedProducts = [
            { ...producto, id }, ...oldProduct
        ]
        await fs.promises.writeFile(this.path, JSON.stringify(modifiedProducts))
    }





}

const productos = new ProductManager

// productos.addProduct("notebook","Notebook intel celeron",100100,"https://http2.mlstatic.com/D_NQ_NP_926977-MLA51903807543_102022-O.webp","1stc",29)
// productos.addProduct("libro","libro moderno",100,"https://http2.mlstatic.com/D_NQ_NP_926977-MLA51903807543_102022-O.webp","2stc",10)

/* LLAMADO DE LOS METODOS*/
//------------------------ 

// productos.getProducts()

//productos.getProductsById(2)

//productos.deleteProductsById(1) 

productos.updateProducts({
    title: 'relog',
    description: 'relog dorado',
    price: 500,
    thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_926977-MLA51903807543_102022-O.webp',
    code: '8stc',
    stock: 4,
    id: 3

})