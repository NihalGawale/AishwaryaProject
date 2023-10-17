import { productById } from "@/app/services/product";
import CommonDetails from "@/components/CommonDetails";

export default async function ProductDetails({ params }) {
    const productDetailsData = await productById(params.details);
  
    console.log(productDetailsData, "PPPPPPPPP");
  
    return(
        // <>Details</>
        <CommonDetails item={productDetailsData && productDetailsData.data} />
    );
  }