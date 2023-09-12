import MenuPage from "@/app/menu/page";
import Link from "next/link";
import Sidebar from "./Sidebar";

const Navbar = () => {
  return (
    <div className="h-12 text-red-500 flex justify-between items-center p-4 border-b-2 border-b-red-500">
      {/* Logo */}
      <div className="text-xl">
        <Link href="/">BabaKaDhaba</Link>
      </div>
      {/* MobileMenu */}
      <div>
        <Sidebar />
      </div>
    </div>
  );
};

export default Navbar;
