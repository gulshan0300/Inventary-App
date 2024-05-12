import express  from 'express';
import path from 'path';
import ProductController from './src/controller/productController.js';
import expLayouts from 'express-ejs-layouts';
import ValidateFormData from './src/middleware/productMiddelware.js';
import {fileUpload} from './src/middleware/file-upload-middelware.js';
import UserController from './src/controller/user.controller.js';
import session from 'express-session';
import {auth} from './src/middleware/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middleware/lastVisit.middleware.js';
//creating instance of ProductController
const productController=new ProductController();
const usersController=new UserController();
const server=express();
server.use(express.static('public'));
server.use(session({
    secret:'keyGenerator',
    resave:false,
    saveUninitialized:true,
    cookies:{secure:false}
}));


server.use(cookieParser());
server.use(setLastVisit);
//setting for parsing data

server.use(express.urlencoded({extended:false}));

//setting up the view engine and defining path of view folder
server.set('view engine','ejs');
server.set('views',path.join(path.resolve(),'src','views'));
server.use(expLayouts);

//registration and login request
server.get('/register' ,usersController.getRegister);
server.post('/register',usersController.postRegister);
server.get('/login',usersController.getLogin);
server.post('/login',usersController.postLogin);
server.get('/logout',usersController.logout);

//product related request
server.get('/',auth,productController.getProduct);
server.get('/new',auth,productController.getAddNew);

server.get('/update-product/:id',auth,productController.getupdateProductView);
server.post('/update-product',auth,fileUpload.single('imageUrl'),  productController.postUpdateProduct);


server.post('/delete-product/:id',auth,productController.deleteProduct);

server.post('/',auth,fileUpload.single('imageUrl'),ValidateFormData,  productController.addNewProduct);
server.use(express.static('src/views'));



server.listen(3400,()=>{
    console.log('server is listing on 3400');
});