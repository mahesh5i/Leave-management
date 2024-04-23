import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import LeaveTable from "@/models/leave";

export async function GET(){
    try{
        await connectMongoDB();
        const query = {'role':'2' };
        const user = await LeaveTable.find(query);
        return NextResponse.json({ user })
    }catch(error){
        console.log(error)

    }
}
export const revalidate = 0