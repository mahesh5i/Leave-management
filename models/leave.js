import mongoose,{Schema, models} from "mongoose";

const userSchema = new Schema({
        reason:{
          type: String,
          required :true,  
        },
        fromdate: {
            type: String,
            required :true,  
        },
        todate: {
            type: String,
            required :true, 
          },
        status:{
            type: String,
            required :true,  
        },
        email:{
            type: String,
            required :true,  
        },
        name:{
            type: String,
            required :true,  
        },
        role:{
            type: String,
            required :true,  
        },
      },
      {timestamps:true}
);

const LeaveTable = models.LeaveTable || mongoose.model("LeaveTable", userSchema)
export default LeaveTable;
