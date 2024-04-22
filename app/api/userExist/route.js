import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        await connectMongoDB();
        const {email} = await req.json();
        const query = { email: email };
        const user = await User.findOne(query);
        return NextResponse.json({ user })
    }catch(error){
        console.log(error)

    }
}