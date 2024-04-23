import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await connectMongoDB();
        const query = {'role':'2' };
        const user = await User.find(query);
        console.log(user)
        return NextResponse.json({ user })
    }catch(error){
        console.log(error)

    }
}
export const revalidate = 0;
