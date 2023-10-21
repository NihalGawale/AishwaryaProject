"use client";
import React from "react";

import { useRouter } from "next/navigation";
import Image from "next/image";
const ProductTile = ({ item }) => {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`/product/${item._id}`)}>
      <div  className="overflow-hidden relative aspect-w-1 aspect-h-1 h-52">
        <Image
          src={item.imageUrl}
          alt="Product image"
          fill={true} 
          objectFit="cover"
          className="h-full w-full transition-all duration-500 hover:scale-125"
        />
      </div>
      {item.onSale === "yes" ? (
        <div className="absolute top-0 m-2 rounded-full bg-black">
          <p className="rounded-full  p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
            Sale
          </p>
        </div>
      ) : null}
      <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
        <div className="mb-2 flex flex-col md:flex-row">
          <div
            className={`mr-3 text-sm font-semibold ${
              item.onSale === "yes" ? "line-through" : ""
            }`}
          >{`$ ${item.price}`}</div>
          {item.onSale === "yes" ? (
            <div className="mr-3 text-sm font-semibold text-red-700">{`$ ${(
              item.price -
              item.price * (item.priceDrop / 100)
            ).toFixed(2)}`}</div>
          ) :  <div className="mr-3 my-5 md:my-0 text-sm font-semibold text-red-700"></div>}
          {item.onSale === "yes" ? (
            <div className="mr-3 text-sm font-semibold">{`(${item.priceDrop}%)off`}</div>
          ) : null}
          
        </div>
        <h3 className="md-2 text-gray-400 text-sm">{item.name}</h3>
      </div>
    </div>
  );
};

export default ProductTile;
