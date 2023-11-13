import { getAllAdminProducts } from '@/app/services/product';
import CommonListingItem from '@/components/CommonListingItem';
import React from 'react';

const AllProducts = async() => {
    const getAllProducts = await getAllAdminProducts()
     console.log(getAllProducts,"GGGGGGGGGGGGGGGGGGGG");
    return (
      <div>
        <CommonListingItem data = {getAllProducts && getAllProducts.data}/>
      </div>
    );
}

export default AllProducts;
