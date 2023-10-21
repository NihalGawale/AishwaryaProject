import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";

const stripe = require("stripe")("sk_test_51O2s4oSBkGfmYeLgGNPa4hRQrZ9AiAVkYsY5Cx0KlqMcbiDC1SZB393uNrGisOBtLrm5R5wVzQ8aQs5ktNXnIWsu00mlbe17MA");
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const isAuthUser = await AuthUser(req)
    if(AuthUser){
        const res = await req.json(); 
        const session  = await stripe.checkout.sessions.create({
            payment_method_types : ["card"],
            line_items : res,
            mode : "payment",
            success_url : "http://localhost:3000/checkout" + "?status=success",
            cancel_url : "http://localhost:3000/checkout" + "?status=cancel"
    
         
        })
        return NextResponse.json({
            success : true,
            id : session.id
        })
    }else{
        return NextResponse.json({
            success : true,
            message : "You are not authenticated"
        })
    }
   
  
  } catch (error) {
    console.log(`Error in new User Registration: ${error.message}`);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong! Please try again later",
    });
  }
}
