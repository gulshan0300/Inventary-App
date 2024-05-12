import UserModel from "../model/user.model.js";
import ProductModel from "../model/product.model.js";

export default class UserController{
    getRegister(req,res){
        res.render('register');
    };

    getLogin(req,res){
        res.render('login',{message:null});
    }

    postRegister(req,res){
        const {name,email,password}=req.body;
        UserModel.add(name,email,password);
        res.render('login',{message:null});
    }
    postLogin(req,res){
        const {email,password}=req.body;
        if(UserModel.verifyUser(email,password)){
            req.session.userEmail=email;
            const products=ProductModel.get();
            res.render('product',{products,userEmail:req.session.userEmail});
            
            //console.log(req.session);
            //console.log(req.session.userEmail);

        }
        else{
            res.render('login',{message:'Invalid Credential'});
        }
    }
    logout(req,res){
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }
            else{
                res.redirect('/login');
            }
        });
        res.clearCookie('lastVisit');
    }
}