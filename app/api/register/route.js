import { connectMongoDB } from "@/lib/mongodb";
import { message } from "antd";
import { NextResponse} from "next/server";
import User from "@/models/user";

export async function POST(req){
    try{
        const {name,
        age,
        address,
        desigination,
        email,
        password,
        mobilenumber,
        gender,
        role}= await req.json();
        await connectMongoDB();
        const userData = new User({
            name:name,
            age:age,
            address:address,
            desigination:desigination,
            email:email,
            password:password,
            mobilenumber:mobilenumber,
            gender:gender,
            role:role,
            status:'active'
        })
        await userData.save()
        return NextResponse.json({message:'sucesss'},{status:'201'})
    }catch(error){
        return NextResponse.json({message:'error'},{status:'500'})
    }
}