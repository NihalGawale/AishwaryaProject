import Cookies from "js-cookie";

export const addNewProduct = async (formData) => {
  try {
    const response = await fetch("/api/admin/add-product", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllAdminProducts = async (req, res) => {
  try {
    const res = await fetch("https://aishwarya-project.vercel.app/api/admin/allProducts", {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updatedProduct = async (formData) => {
  try {
    const res = await fetch("/api/admin/update-product", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log(data, "UUUUUPPPPP");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deletedProduct = async (id) => {
  try {
    const res = await fetch(`/api/admin/delete-product?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const productByCategory = async(id) => {
  try {
  
    const res = await fetch(
      `https://aishwarya-project.vercel.app/api/admin/product-by-category?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const data = await res.json();
    console.log(data,"DDDDD");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const productById = async(id) => {
  try{
    const res = await fetch(
      `https://aishwarya-project.vercel.app/api/admin/product-by-id?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data
  }catch (error) {
    console.log(error);
  }
 
}
