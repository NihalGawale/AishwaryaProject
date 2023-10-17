"use client";

import { adminNavOptions, navOptions, styles } from "@/utils";
import React, { Fragment, useContext, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { GlobalContext } from "@/context";
import CommonModal from "../CommonModal/CommonModal";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import CartModal from "../CartModal";


function NavItems({ isModalView = false, isAdminView,router }) {
  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModalView ? "" : "hidden"
      }`}
      id="nav-items"
    >
      <ul
        className={`flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
          isModalView ? "border-none" : "border border-gray-100"
        }`}
      >
        {isAdminView
          ? adminNavOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                onClick={() => router.push(item.path)}
                key={item.id}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                onClick={() => router.push(item.path)}
                key={item.id}
              >
                {item.label}
              </li>
            ))}
      </ul>
    </div>
  );
}

const NavBar = () => {
  const pathName = usePathname();
  const isAdminView = pathName.includes("admin-view");
  const {
    showNavModal,
    setShowNavModal,
    isAuthUser,
    user,
    setIsAuthUser,
    setUser,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    setShowCartModal,
    showCartModal
  } = useContext(GlobalContext);


  const router = useRouter();


  useEffect(() => {
    if(pathName !== "/admin-view/add-product" && currentUpdatedProduct !== null){
       setCurrentUpdatedProduct(null)
    }
    
  }, [pathName]);




function handleLogout() {
  setIsAuthUser(false);
  setUser(null);
  Cookies.remove("token");
  localStorage.clear();
  router.push("/");
}

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 text-black">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div onClick={() => router.push("/")} className="flex items-center cursor-pointer">
            <span className="self-center text-2x1 font-semibold whitespace-nowrap ">
              Fashonify
            </span>
          </div>
          <div className="flex md:order-2 gap-2">
            {!isAdminView && isAuthUser ? (
              <Fragment>
                <button className="button">Account</button>
                <button className="button" onClick={()=> setShowCartModal(true)}>Cart</button>
              </Fragment>
            ) : null}
            {user?.role === "admin" ? (
              isAdminView ? (
                <button onClick={() => router.push("/")} className="button">Client View</button>
              ) : (
                <button onClick={() => router.push("/admin-view")} className="button">Admin View</button>
              )
            ) : null}
            {isAuthUser ? (
              <button onClick={handleLogout} className="button">
                Logout
              </button>
            ) : (
              <button onClick={() => router.push("/login")} className="button">
                Login
              </button>
            )}
            <MenuIcon
              className="md:hidden cursor-pointer"
              onClick={() => setShowNavModal(true)}
            />
          </div>
          <NavItems isAdminView={isAdminView} router={router}/>
        </div>
      </nav>
      <CommonModal
        showModalTitle={false}
        mainContent={<NavItems isModalView={true} isAdminView={isAdminView} router={router}/>}
        show={showNavModal}
        setShow={setShowNavModal}
      />
       {showCartModal && <CartModal />}
    </>
  );
};

export default NavBar;
