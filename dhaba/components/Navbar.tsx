import Image from "next/image";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Sidebar from "./Sidebar";
import UserLinks from "./UserLinks";
import AddNewProduct from "./AddNewProduct";

const Navbar = () => {
  const links = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "Menu", path: "/menu" },
    { id: 3, title: "Working Hours", path: "/" },
    { id: 4, title: "Contact Us", path: "/" },
  ];

  // const user = false;

  return (
    <div className="h-14 text-red-500 flex justify-between items-center p-4 border-b-2 border-b-red-500 md:h-24 lg:px-10 xl:px-40">
      {/* Logo */}
      <div className="text-xl md:font-bold flex-1">
        <Link href="/">FeastFlix</Link>
      </div>
      <div className="hidden md:flex gap-4">
        {links.map((link) => (
          <Link href={link.path} key={link.id}>
            {link.title}
          </Link>
        ))}
        <div className="hidden md:flex gap-4 justify-end items-center">
          <div className="md:absolute top-3 right-2 lg:static flex items-center gap-2 cursor-pointer bg-orange-300 rounded-md px-1">
            <Image src="/phone.png" alt="phone" width={20} height={20} />
            <span>971 456 78</span>
          </div>
          <AddNewProduct />
          <UserLinks />
          <CartIcon />{" "}
        </div>
      </div>
      {/* MobileMenu */}
      <div className="md:hidden">
        <Sidebar />
      </div>
    </div>
  );
};

export default Navbar;
