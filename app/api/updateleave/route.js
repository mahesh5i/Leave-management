import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import LeaveTable from "@/models/leave";

export async function POST(req){
    try{
        await connectMongoDB();
        const {email,statusdata} = await req.json();
        console.log(statusdata)
        const user = await LeaveTable.findOneAndUpdate({email:email},{'status':statusdata});
        return NextResponse.json({ user })
    }catch(error){
        console.log(error)

    }
}