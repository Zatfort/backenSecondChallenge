import { promises as fs } from "fs"

export default class ProductManager {
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

        await fs.writeFile(this.path, JSON.stringify(this.products))
    }

    readProducts = async () => {
        let firstresponse = await fs.readFile(this.path , "utf-8")

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

        await fs.writeFile(this.path, JSON.stringify(productFilter))


    }

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductsById(id)

        let oldProduct = await this.readProducts()

        let modifiedProducts = [
            { ...producto, id }, ...oldProduct
        ]
        await fs.writeFile(this.path, JSON.stringify(modifiedProducts))
    }





}

//const productos = new ProductManager()

// productos.addProduct("Notebook","Notebook intel celeron",100100,"https://http2.mlstatic.com/D_NQ_NP_926977-MLA51903807543_102022-O.webp","1stc",29)
// productos.addProduct("Libro","libro moderno",100,"https://http2.mlstatic.com/D_NQ_NP_926977-MLA51903807543_102022-O.webp","2stc",10)
// productos.addProduct("Mochila ","Mochila Everlast Original",10175,"https://http2.mlstatic.com/D_NQ_NP_606018-MLA50800424470_072022-O.webp","3stc",5)
// productos.addProduct("celular","Samsung Galaxy",49000,"https://http2.mlstatic.com/D_NQ_NP_2X_938148-MLA49545998805_042022-F.webp","4stc",14)
// productos.addProduct("Pad Mouse","Map Of Lord Of The Rings ",2000,"https://http2.mlstatic.com/D_NQ_NP_709436-MLA53586971481_022023-O.webp","5stc",10)
// productos.addProduct("Anillos De Encuadernacion","Anillos De Encuadernacion De Hojas",1000,"https://http2.mlstatic.com/D_NQ_NP_730889-MLA53884319859_022023-O.webp","6stc",17)
// productos.addProduct("Aspiradora","Philco Ciclonica",30000,"https://http2.mlstatic.com/D_NQ_NP_2X_709277-MLA51839578094_102022-F.webp","7stc",1)
// productos.addProduct("Heladera","no frost Philco",291000,"https://http2.mlstatic.com/D_NQ_NP_2X_770440-MLA51044564775_082022-F.webp","8stc",3)
// productos.addProduct("Gafas","Gafas Aviador Lentes Unisex Clásicos Tendencia 2022",8390,"https://http2.mlstatic.com/D_NQ_NP_861900-MLA53439113639_012023-O.webp","9stc",5)
// productos.addProduct("Auriculares","Auriculares Beats Solo",80000,"https://http2.mlstatic.com/D_NQ_NP_2X_863872-MLA46911606826_072021-F.webp","10stc",8)

/* LLAMADO DE LOS METODOS*/
//------------------------ 

//productos.getProducts()

//productos.getProductsById(2)

//productos.deleteProductsById(1) 

/*
productos.updateProducts({
    title: 'relog',
    description: 'relog dorado',
    price: 500,
    thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_926977-MLA51903807543_102022-O.webp',
    code: '8stc',
    stock: 4,
    id: 3

})
*/