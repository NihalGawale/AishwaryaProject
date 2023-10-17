import { productByCategory } from "@/app/services/product";
import CommonListingItem from "@/components/CommonListingItem";

export default async function MenAllProducts() {
    const getAllProducts = await productByCategory("men");
  
    return <CommonListingItem data={getAllProducts && getAllProducts.data} />;
  }