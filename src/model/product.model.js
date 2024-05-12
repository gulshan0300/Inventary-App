

export default class ProductModel{
    constructor(id,name,description,imageUrl){
        this.id=id;
        this.name=name;
        this.description=description;
        this.imageUrl=imageUrl;
    }

    static get(){
        return products;
    } 

    static add(name,description,imageUrl){
        const newProduct=new ProductModel(products.length+1,name,description,imageUrl);
        products.push(newProduct);
    }
    static getId(id){
        return products.find((p)=>p.id==id);
    }
    static update(id,name,description,imageUrl){
        const index= products.findIndex((p)=>p.id==id);
        products[index]={id:id,name:name,description:description,imageUrl:imageUrl};
    }
    static delete(id){
        const index=products.findIndex((p)=>p.id==id);
        products.splice(index,1);
    }
}

let products=[
    new ProductModel('1','name of Product','discription of product','https://rukminim2.flixcart.com/image/416/416/xif0q/regionalbooks/v/c/p/atomic-habits-book-the-life-changing-paperback-english-2018-by-original-imagf5mdh4qbr8tr.jpeg?q=70'),
    new ProductModel('1','name of Product','discription of product','https://rukminim2.flixcart.com/image/416/416/xif0q/regionalbooks/v/c/p/atomic-habits-book-the-life-changing-paperback-english-2018-by-original-imagf5mdh4qbr8tr.jpeg?q=70'),
    new ProductModel('1','name of Product','discription of product','https://rukminim2.flixcart.com/image/416/416/xif0q/regionalbooks/v/c/p/atomic-habits-book-the-life-changing-paperback-english-2018-by-original-imagf5mdh4qbr8tr.jpeg?q=70')
]