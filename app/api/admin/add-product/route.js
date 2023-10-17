import connectToDB from "@/database/connection";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  sizes: Joi.array().required(),
  deliveryInfo: Joi.string().required(),
  onSale: Joi.string().required(),
  priceDrop: Joi.number().required(),
  imageUrl: Joi.string().required(),
});

export const dynamicForce = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();

    const isAuthUser = AuthUser(req);
     if(isAuthUser?.role === "admin" ) {

        const data = await req.json();
        const {
            name,
            description,
            price,
            imageUrl,
            category,
            sizes,
            deliveryInfo,
            onSale,
            priceDrop,
          } = data;

          const { error } = AddNewProductSchema.validate({
            name,
            description,
            price,
            imageUrl,
            category,
            sizes,
            deliveryInfo,
            onSale,
            priceDrop,
          });


      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newlyCreatedProduct = await Product.create(data);

         if (newlyCreatedProduct) {
        return NextResponse.json({
          success: true,
          message: "Product added successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to add the product ! please try again",
        });
      }
    }else {
        return NextResponse.json({
            success:false,
            message : "You are not authorized!"
        })
     }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}
