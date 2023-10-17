export const registerNewUser = async (formData) => {
  try {
    console.log("registerNewUser----")
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(response,"response---------")
    const finalData = response;
    return finalData;
    
  } catch (e) {
    console.log("error", e);
  }
};
