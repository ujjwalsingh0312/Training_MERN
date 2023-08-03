//Product JS contain the structure of a Pizza Object
//Pizza Object - Id, Name, Description, Price, Rating, Image

class Product{
    constructor(id, name, desc, price, url){
        //this - keyword (contains current calling object)
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.url = url;
        this.isAddedInCart = false;
    }
}
export default Product;