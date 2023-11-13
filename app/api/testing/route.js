import { NextResponse } from "next/server";

export function GET (){
  return  NextResponse.json({
        success: false,
        message: "Successfull",
      })
}