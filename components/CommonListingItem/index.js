"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ProductButton from "./ProductButtons";
import ProductTile from "./ProductTile";
import { useEffect } from "react";
import Notification from "../Notification";



const CommonListingItem = ({ data }) => {
  const router = useRouter();
   
  useEffect(() => {
    router.refresh();
  }, []);

  console.log(data,"CommonListingItem DDDDDDD");
  return (
    <section className="bg-white pb-12 md:py-12 sm:py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
          {data && data.length
            ? data.map((item) => (
                <article
                  className="relative flex flex-col overflow-hidden border cursor-pointer"
                  key={item._id}
                  
                >
                  <ProductTile item={item} />
                  <ProductButton item={item} />
                </article>
              ))
            : <section className="h-auto p-2 md:p-5 col-span-4 bg-gray-200">
            <div className="mx-auto md:px-4 sm:px-6 lg:px-8">
              <div className="mx-auto my-2 md:my-8 max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
                <div className="bg-white shadow">
                  <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
                    <h1 className="font-bold text-lg flex justify-center">
                      No Product Found
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </section>}
        </div>
      </div>
      <Notification />
    </section>
  );
};

export default CommonListingItem;
