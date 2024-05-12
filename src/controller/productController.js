import path from 'path';
import ProductModel from '../model/product.model.js';


export default class ProductController{
    getProduct(req,res){
        let products=ProductModel.get();
        //console.log(products);
         res.render('product',{products:products,userEmail:req.session.userEmail});

    };
     
    getAddNew(req,res){
         let message='';
        return res.render('new-Product',{message,userEmail:req.session.userEmail});
    }

    addNewProduct(req,res){
    //     const {name,description,image}=req.body;
    //     let error=[];
    //     if(!name||name.trim()==''){
    //         error.push('name is invalid');
    //     }
    //     try{
    //         const validUrl=new URL(image);
    //     }catch(err){
    //         error.push('invalid url');
    //     }
    //     if(error.length>0){
    //         let message=error[0];
    //         res.render('new-Product',{message});
    //     }
    //     else{
    //     ProductModel.add(req.body);
    //    // console.log(req.body);
    //     let products=ProductModel.get();
    //     res.render('product',{products});}
            const {name,description}=req.body;
            const imageUrl='images/'+req.file.filename;
            console.log('images/'+req.file.filename);
            ProductModel.add(name,description,imageUrl);
       // console.log(req.body);
        let products=ProductModel.get();
        res.render('product',{products,userEmail:req.session.userEmail});
    }

    getupdateProductView(req,res,next){
        const id=req.params.id;
        const productFound=ProductModel.getId(id);
        if(productFound){
            res.status(201).render('update-product',{product:productFound,message:null,userEmail:req.session.userEmail});
        }
        else{
            res.status(401).send('Product not found');
        }
    }

    postUpdateProduct(req,res,next){
       // const id=req.params.id;
        const {id,name,description}=req.body;
        const imageUrl='images/'+req.file.filename;
        //console.log(id,name,description,imageUrl);
        ProductModel.update(id,name,description,imageUrl);
       // console.log(req.body);
        let products=ProductModel.get();
        res.render('product',{products,userEmail:req.session.userEmail});
    }
    deleteProduct(req,res){
        const id=req.params.id;
        const productfound=ProductModel.getId(id);
        if(!productfound){
           return res.status(401).send('product not found')
        }
        ProductModel.delete(id);
        let products=ProductModel.get();
        res.render('product',{products,userEmail:req.session.userEmail});

    }
};