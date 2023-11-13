import connectToDB from "@/database/connection";
import User from "@/models/users";
import { NextResponse } from "next/server";

export async function GET (req){

   const response = await connectToDB();
   console.log(response);
//   return  NextResponse.json({
//         success: true,
//         message: "Successfull",
//       })
if(response){

    const checkUser = await User.find()
    console.log(checkUser,"CCCCCCCCCCCCCCC");
      return  NextResponse.json({
        success: true,
        data:checkUser,
        message: "Successfull",
      })
    
    // if(checkUser) {
    //         return NextResponse.json({
    //             success: true,
    //             data: checkUser, 
    //           });
    //     }else{
    //         return  NextResponse.json({
    //                     success: false,
    //                     message: "Failed",
    //                   })
    //     }
}
// if(checkUser) {
//     return NextResponse.json({
//         success: true,
//         data: checkUser, 
//       });
// }else{
//     return  NextResponse.json({
//                 success: false,
//                 message: "Failed",
//               })
// }
}