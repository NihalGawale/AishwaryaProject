"use client";
import InputComponents from "@/components/FormElements/InputComponents/InputComponents";
import SelectComponent from "@/components/FormElements/SelectComponent/SelectComponent";
import { loginFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { login } from "../services/login";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import ComponentLevelLoader from "@/components/Loader/ComponentLevelLoader";
import Notification from "@/components/Notification";
import { toast } from "react-toastify";

const initialFormData = {
  email: "",
  password: "",
};
const Login = () => {
  const [formData, setFormData] = useState(initialFormData);
  const {
    isAuthUser,
    setIsAuthUser,
    user,
    setUser,
    componentLevelLoader,
    setComponentLevelLoader,
    pageLevelLoader
  } = useContext(GlobalContext);

  console.log(formData);

  const router = useRouter();

  function isFormValid() {
    return formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  async function handleLogin() {

    setComponentLevelLoader({loading: true,id:""});

    const res = await login(formData);
    console.log(res);

    if (res.success) {
      console.log("res success");
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(true);
      setUser(res?.finalData?.user);
      setFormData(initialFormData);
      Cookies.set("token", res?.finalData?.token);
      localStorage.setItem("user", JSON.stringify(res?.finalData?.user));
      setComponentLevelLoader({loading: false,id:""});
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsAuthUser(false);
      setComponentLevelLoader({loading: false,id:""});
    }
  }

  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);
  return (
    <div className=" bg-white relative">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 md:mt-8 mr-auto max-w-7x1 xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full md:px-10 1g:flex-row">
          <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2x1 lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start px-5 pb-5 md:px-10  md:py-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center font-serif">
                Login
              </p>

              <div className="w-full mt-6 mr-0 mb-0 ml-e relative space-y-8">
                {loginFormControls.map((controlItem) =>
                  controlItem.componentType === "input" ? (
                    <InputComponents
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      value={formData[controlItem.id]}
                      onChange={(event) => {
                        setFormData({
                          ...formData,
                          [controlItem.id]: event.target.value,
                        });
                      }}
                    />
                  ) : controlItem.componentType === "select" ? (
                    <SelectComponent
                      options={controlItem.options}
                      label={controlItem.label}
                    />
                  ) : null
                )}
                <button
                  className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                     "
                  disabled={!isFormValid()}
                  onClick={handleLogin}
                >
                  {
                    componentLevelLoader && componentLevelLoader.loading ? <ComponentLevelLoader 
                    text={"Logging In"}
                    color={"#ffffff"}
                    loading={
                      componentLevelLoader && componentLevelLoader.loading
                    }
                    /> : "Login"
                  }
                 
                </button>
                <div className="flex flex-col gap-2">
                  <p>New to website ?</p>
                  <button
                    className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                     "
                    onClick={() => router.push("/register")}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default Login;
