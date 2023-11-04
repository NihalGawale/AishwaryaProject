"use client";

import { adminNavOptions, navOptions, styles } from "@/utils";
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { GlobalContext } from "@/context";
import CommonModal from "../CommonModal/CommonModal";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import CartModal from "../CartModal";

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
    showCartModal,
  } = useContext(GlobalContext);

  const router = useRouter();
  // const [selected, setSelected] = useState(false);
  const [menuItemId, setMenuItemId] = useState();
  function NavItems({ isModalView = false, isAdminView, router }) {
    const handleClick = (item) => {
      setShowNavModal(false);
      setMenuItemId(item.id);
      // document.getElementById(item.id).style.color = "#111827";

      router.push(item.path);
    };

    return (
      <div
        className={`items-center justify-between w-full md:flex md:w-auto ${
          isModalView ? "" : "hidden"
        }`}
        id="nav-items"
      >
        <div
          className={`flex flex-col p-4 md:p-0 mt-4 font-semibold  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
            isModalView ? "border-none" : "border border-gray-100 "
          }`}
        >
          {isAdminView
            ? adminNavOptions.map((item) => (
                <li
                  className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 hover:text-gray-600 rounded md:p-0 "
                  onClick={() => {
                    router.push(item.path), setShowNavModal(false);
                  }}
                  key={item.id}
                >
                  {item.label}
                </li>
              ))
            : navOptions.map((item) => (
                <div
                  className={`cursor-pointer block py-2 pl-3 pr-4 hover:text-gray-900 text-gray-600  rounded md:p-0`}
                  onClick={() => handleClick(item)}
                  key={item.id}
                  id={item.id}
                >
                  {item.label}
                </div>
              ))}
        </div>
      </div>
    );
  }

  function NavButtons({ isModalView = false, isAdminView, router }) {
    return (
      <div
        className={`flex flex-col md:flex md:flex-row md:order-2 gap-2 ${
          isModalView ? "" : "hidden"
        }`}
        id="nav-buttons"
      >
        {!isAdminView && isAuthUser ? (
          <Fragment>
            <button
              className="button"
              onClick={() => {
                router.push("/account"), setShowNavModal(false);
              }}
            >
              Account
            </button>
            <button
              className="button"
              onClick={() => {
                setShowCartModal(true), setShowNavModal(false);
              }}
            >
              Cart
            </button>
          </Fragment>
        ) : null}
        {user?.role === "admin" ? (
          isAdminView ? (
            <button
              onClick={() => {
                router.push("/"), setShowNavModal(false);
              }}
              className="button"
            >
              Client View
            </button>
          ) : (
            <button
              onClick={() => {
                router.push("/admin-view"), setShowNavModal(false);
              }}
              className="button"
            >
              Admin View
            </button>
          )
        ) : null}
        {isAuthUser ? (
          <button onClick={handleLogout} className="button">
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              router.push("/login"), setShowNavModal(false);
            }}
            className="button"
          >
            Login
          </button>
        )}
      </div>
    );
  }

  useEffect(() => {
    console.log(currentUpdatedProduct, "CCCCC");
    if (
      pathName !== "/admin-view/add-product" &&
      currentUpdatedProduct !== null
    ) {
      setCurrentUpdatedProduct(null);
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
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 text-black shadow-xl">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div
            onClick={() => router.push("/")}
            className="flex items-center cursor-pointer"
          >
            <span className="self-center text-2xl md:text-4xl font-lora font-semibold text-[#171616] whitespace-nowrap ">
              Fashonify
            </span>
          </div>

          <div className="lg:hidden cursor-pointer">
            <MenuIcon onClick={() => setShowNavModal(!showNavModal)} />
          </div>

          <NavItems isAdminView={isAdminView} router={router} />
          <NavButtons isAdminView={isAdminView} router={router} />
        </div>
      </nav>
      <CommonModal
        showModalTitle={false}
        mainContentOne={
          <NavItems
            isModalView={true}
            isAdminView={isAdminView}
            router={router}
          />
        }
        mainContentTwo={
          <NavButtons
            isModalView={true}
            isAdminView={isAdminView}
            router={router}
          />
        }
        show={showNavModal}
        setShow={setShowNavModal}
      />
      {showCartModal && <CartModal />}
    </>
  );
};

export default NavBar;
