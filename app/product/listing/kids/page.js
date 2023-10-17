import { productByCategory } from "@/app/services/product";
import CommonListingItem from "@/components/CommonListingItem";

export default async function KidsAllProducts() {
    const getAllProducts = await productByCategory("kids");
  
    return <CommonListingItem data={getAllProducts && getAllProducts.data} />;
  }