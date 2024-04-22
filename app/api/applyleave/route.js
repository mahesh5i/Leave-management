import { connectMongoDB } from "@/lib/mongodb";
import { message } from "antd";
import { NextResponse} from "next/server";
import LeaveTable from "@/models/leave";
export async function POST(req){
    try{
        const {reason,
        fromdate,
        todate,
        email,
        status,
        name,
        role
        }= await req.json();
        await connectMongoDB();
        const userData = new LeaveTable({
            reason:reason,
            fromdate:fromdate,
            todate:todate,
            email:email,
            status:status,
            name:name,
            role:role
        })
        await userData.save()
        return NextResponse.json({message:'sucesss'},{status:'201'})
    }catch(error){
        return NextResponse.json({message:'error'},{status:'500'})
    }
}