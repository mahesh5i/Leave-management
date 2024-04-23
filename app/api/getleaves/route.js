import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import LeaveTable from "@/models/leave";

export async function POST(req){
    try{
        await connectMongoDB();
        const {email} = await req.json();
        const query = {email:email };
        const user = await LeaveTable.find(query);
        return NextResponse.json({ user })
    }catch(error){
        console.log(error)

    }
}
export const revalidate = 0