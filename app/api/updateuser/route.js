import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        await connectMongoDB();
        const {email,statusdata} = await req.json();
        console.log(statusdata)
        const user = await User.findOneAndUpdate({email:email},{'status':statusdata});
        return NextResponse.json({ user })
    }catch(error){
        console.log(error)

    }
}