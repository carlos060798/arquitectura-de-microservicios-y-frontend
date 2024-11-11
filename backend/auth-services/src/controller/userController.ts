import { Request,Response } from "express"; 
import  User from "../db/user.model";

class  userController {
   public static async createUser(req: Request, res: Response) {
    console.log(req.body);  
       
     const { name, email, password } = req.body;

     // Validate input

     try {
         // Validate email format
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailRegex.test(email))  return  res.status(400).send('Invalid email format');
         

            // Validate password length
            if (password.length < 6) {  return res.status(400).send('Password must be at least 8 characters long');}
           

            const user = await User.create({ name, email, password });
            await user.save();
             return res.status(201).send(user);

        } catch (error) {
            console.error(error);
            return res.status(400).send(error);

    
    }
}



    

  
    
    public static async loginUser(req: Request, res: Response) {
        
        const { email, password } = req.body;
        
        try {
            const user = await User.findOne ({ email, password });
            if (!user) {
                throw new Error('Invalid credentials');
            }
            return res.status(200).send(user);
            
        } catch (error) {
            console.error(error);
            return res.status(400).send(error);

    }
}
}

export default userController;