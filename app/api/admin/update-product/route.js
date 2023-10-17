import connectToDB from "@/database/connection";
import Products from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();

    const data = await req.json();
    console.log(data,"req body");
    const {
      _id,
      name,
      price,
      description,
      category,
      sizes,
      deliveryInfo,
      onSale,
      priceDrop,
      imageUrl,
    } = data;
    const product = await Products.findOne({_id: _id })
    console.log(product);
    const updatedProduct = await Products.findOneAndUpdate(
      { _id: _id },
      {
        name,
        price,
        description,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      },
      { new: true }
    );

    console.log(updatedProduct,"uuuuuuppppppp");
    if(updatedProduct){
        return NextResponse.json({
            success : true,
            message :  "Product updated successfully"
        })
    }else {
        return NextResponse.json({
            success: false,
            message: "Failed to update the Product! Please try again",
        })
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}
