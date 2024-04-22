import mongoose,{Schema, models} from "mongoose";

const userSchema = new Schema({
        name:{
          type: String,
          required :true,  
        },
        age: {
            type: String,
            required :true,  
        },
        address: {
            type: String,
            required :true, 
          },
        desigination: {
            type: String,
            required :true,  
          },
        email: {
            type: String,
            required :true,  
          },
        mobilenumber:{
            type: String,
            required :true,  
          },
        gender: {
            type: String,
            required :true,  
          },
        role:{
            type: String,
            required :true,  
        },
        password:{
            type: String,
            required :true,  
        },
        status:{
          type: String,
          required :true,  
      }
      },
      {timestamps:true}
);

const User = models.User || mongoose.model("User", userSchema)
export default User;
