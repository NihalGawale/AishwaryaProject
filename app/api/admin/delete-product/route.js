import connectToDB from "@/database/connection";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
    try {
        await connectToDB();

        const {searchParams} = new URL(req.url)
        const id = searchParams.get("id");

        if(!id) return NextResponse.json({success: false,message:"Product Id is required"});

        const deletedProduct =  await Product.findByIdAndDelete(id);
             
        if(deletedProduct){
            return NextResponse.json({success: true,message:"Product deleted successfully"});
        }else{
            return NextResponse.json({success: true,message:"Failed to delete Product! Please try again"});
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
          success: false,
          message: "Something went wrong! Please try again",
        });
    }
}