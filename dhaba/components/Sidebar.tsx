"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CartIcon from "./CartIcon";
import UserLinks from "./UserLinks";
import AddNewProduct from "./AddNewProduct";

const Sidebar = () => {
  const links = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "Menu", path: "/menu" },
    { id: 3, title: "Working Hours", path: "/" },
    { id: 4, title: "Contact Us", path: "/" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  //Temporary User
  // const user = false;
  return (
    <div onClick={handleOpen}>
      {!isOpen ? (
        <Image src="/open.png" alt="open-menu" width={20} height={20} />
      ) : (
        <Image src="/close.png" alt="open-menu" width={20} height={20} />
      )}
      {/* <div>
        {isOpen && ( // if isOpen is true then render the div
          <div className="absolute top-0 left-0 w-full h-screen bg-white z-10">
            {links.map((link) => (
              <div key={link.id} className="text-center text-2xl py-4">
                <Link href={link.path}>{link.title}</Link>
              </div>
            ))}
          </div>
        )}
      </div> */}
      {isOpen && (
        <div className="bg-red-500 text-white absolute left-0 top-[120px] h-[calc(100vh-6rem)] flex justify-center items-center flex-col text-3xl gap-7 w-full z-10">
          {links.map((link) => (
            <Link href={link.path} key={link.id}>
              {link.title}
            </Link>
          ))}
          <AddNewProduct />
          <UserLinks />
          <CartIcon />{" "}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
