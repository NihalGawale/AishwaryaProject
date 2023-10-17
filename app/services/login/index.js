export const login = async(formData) => {
    try{
        const response = await fetch('/api/login',{
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(formData),
          })
          console.log(response);
          const data = await response.json()
          return data;
    }catch(e){
        console.log(e.message)
    }
}