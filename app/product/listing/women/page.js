import { productByCategory } from "@/app/services/product";
import CommonListingItem from "@/components/CommonListingItem";

export default async function WomenAllProducts() {
    const getAllProducts = await productByCategory("women");
  
    return <CommonListingItem data={getAllProducts && getAllProducts.data} />;
  }