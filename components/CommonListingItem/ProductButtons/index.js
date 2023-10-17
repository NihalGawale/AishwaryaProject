import { addToCart } from "@/app/services/cart";
import { deletedProduct } from "@/app/services/product";
import ComponentLevelLoader from "@/components/Loader/ComponentLevelLoader";
import { GlobalContext } from "@/context";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { toast } from "react-toastify";

const ProductButton = (item) => {
  const pathName = usePathname();
  const {
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    setComponentLevelLoader,
    componentLevelLoader,
    setShowCartModal,
    user
  } = useContext(GlobalContext);

  const router = useRouter();
  const isAdminView = pathName.includes("admin-view");

  const handleDeleteProduct = async (item) => {
    setComponentLevelLoader({ loading: true, id: item.item._id });

    const res = await deletedProduct(item.item._id);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.refresh();
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  };

  async function handleAddToCart(getItem) {
    console.log(getItem,componentLevelLoader,"GGIIGIGIGIIG");
    setComponentLevelLoader({ loading: true, id: item.item._id   });
    const res = await addToCart({ productID: getItem.item._id, userID: user._id });

    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    }
  }

  return isAdminView ? (
    <>
      <button
        className="productButton"
        onClick={() => {
          setCurrentUpdatedProduct(item.item);
          router.push("/admin-view/add-product");
        }}
      >
        UPDATE
      </button>
      <button
        onClick={() => handleDeleteProduct(item)}
        className="productButton"
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        item._id === componentLevelLoader.id ? (
          <ComponentLevelLoader
            text={"Deleting Product"}
            color={"#ffffff"}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          "DELETE"
        )}
      </button>
    </>
  ): (
    <>
      <button
        onClick={() => handleAddToCart(item)}
        className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        item._id === componentLevelLoader.id ?  (
          <ComponentLevelLoader
            text={"Adding to cart"}
            color={"#ffffff"}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          "Add To Cart"
        )}
      </button>
    </>
  );
};

export default ProductButton;
