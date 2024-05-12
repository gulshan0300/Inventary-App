
import {body,validationResult} from 'express-validator';

const ValidateFormData=async (req,res,next)=>{
    //step1:to set up the rules
    //console.log(body);
    const rules=[
        body('name').isLength({min:1}).withMessage('Name should not be empty'),
        body('description').isLength({min:10}).withMessage('Description should contain more than 10 letter'),
        body('imageUrl').custom((value,{req})=>{
            if(!req.file){
                throw Error('Image is required')
            }
            return true;
        }),
    ];

    //step2:to run the all thes rules
    await Promise.all(rules.map((rule)=>rule.run(req)));

    //step3:check if there any validation error
    let validationError=validationResult(req);
    //console.log(validationError);
    if(!validationError.isEmpty()){
        let message=validationError.array()[0].msg;
        res.render('new-Product',{message});
    }
    else{
    next();
    }


    // const {name,description,image}=req.body;
    //     let error=[];
    //     if(!name||name.trim()==''){
    //         error.push('name is invalid');
    //     }
    //     try{
    //         const validUrl=new URL(image);
    //     }catch(err){
    //         error.push('invalid url');
    //     }
        // if(error.length>0){
        //     let message=error[0];
        //     res.render('new-Product',{message});
        // }
        // else{
        // next();
        // }
}

export default ValidateFormData;