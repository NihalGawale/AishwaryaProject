import connectToDB from "@/database/connection";
import User from "@/models/users";
import { NextResponse } from "next/server";

export async function GET (req){
    await connectToDB();
//   return  NextResponse.json({
//         success: true,
//         message: "Successfull",
//       })
const checkUser = await User.find()
console.log(checkUser);
if(checkUser) {
    return NextResponse.json({
        success: true,
        data: checkUser, 
      });
}else{
    return  NextResponse.json({
                success: false,
                message: "Failed",
              })
}
}