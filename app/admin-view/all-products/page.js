import { getAllAdminProducts } from '@/app/services/product';
import CommonListingItem from '@/components/CommonListingItem';
import React from 'react';

const AdminAllProducts = async() => {
  const allAdminProducts = await getAllAdminProducts()
  console.log(allAdminProducts,"AAAAAAA");
  return (
    <div>
      <CommonListingItem data = {allAdminProducts && allAdminProducts.data}/>
    </div>
  );
}

export default AdminAllProducts;
