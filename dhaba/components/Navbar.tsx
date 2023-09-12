import MenuPage from "@/app/menu/page";
import Link from "next/link";
import Sidebar from "./Sidebar";
import CartIcon from "./CartIcon";

const Navbar = () => {
  const links = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "Menu", path: "/menu" },
    { id: 3, title: "Working Hours", path: "/" },
    { id: 4, title: "Contact Us", path: "/" },
  ];

  const user = false;

  return (
    <div className="h-12 text-red-500 flex justify-between items-center p-4 border-b-2 border-b-red-500">
      {/* Logo */}
      <div className="text-xl">
        <Link href="/">BabaKaDhaba</Link>
      </div>
      <div className="hidden md:flex gap-4">
        {links.map((link) => (
          <Link href={link.path} key={link.id}>
            {link.title}
          </Link>
        ))}
        {!user ? (
          <Link href="/login">Login</Link>
        ) : (
          <Link href="/orders">Orders</Link>
        )}
        <CartIcon />{" "}
      </div>
      {/* MobileMenu */}
      <div className="md:hidden">
        <Sidebar />
      </div>
    </div>
  );
};

export default Navbar;
