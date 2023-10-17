import connectToDB from "@/database/connection";
import Products from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    console.log("get request");
    
    const getAllProducts = await Products.find({});
      
      if (getAllProducts) {
        return NextResponse.json({
          success: true,
          data: getAllProducts,
        });
      }else{
        return NextResponse.json({
            success: false,
            status : 204,
            message: "No Products found",
          });
      }
    }catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}