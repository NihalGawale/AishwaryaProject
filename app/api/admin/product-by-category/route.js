import connectToDB from "@/database/connection";
import Products from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        console.log("request ");
      await connectToDB();
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      const getData = await Products.find({ category: id });
  
      if (getData) {
        return NextResponse.json({
          success: true,
          data: getData,
        });
      } else {
        return NextResponse.json({
          success: false,
          status: 204,
          message: "No Products found !",
        });
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json({
        success: false,
        message: "Something went wrong ! Please try again later",
      });
    }
  }