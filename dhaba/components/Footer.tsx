import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-slate-200 h:12 md:h-34 p-4 lg:p-8 xl:p-10 flex flex-col items-center gap-4 justify-center text-red-500">
      <Link href="/" className="md:font-bold">
        FeastFlix
      </Link>
      <div className="flex flex-col justify-center items-center">
        <p className="capitalize">Copyright © 2023 All rights reserved.</p>
        <div className="flex gap-2">
          <p>Made with 💖 by</p>
          <Link
            href="https://naushadraien.com.np"
            target="_blank"
            className="text-orange-500 md:font-bold hover:text-red-600 hover:underline"
          >
            Naushad Raien
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
