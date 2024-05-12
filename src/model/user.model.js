export default class UserModel{
    constructor(id,name,email,password){
        this.id=id;
        this.name=name;
        this.email=email;
        this.password=password;
    }

    static add(name,email,password){
        const newUser=new UserModel(users.length+1,name,email,password);
        users.push(newUser);

    }
    static verifyUser(email,password){
        let user1=users.find((user)=>{
            return user.email==email && user.password==password;
        });

        return user1;
        
    }

}
const users=[];