import { pizzas } from "@/data";
import Image from "next/image";
import Link from "next/link";

const Category = () => {
  return (
    <div className="flex flex-wrap text-red-500">
      {pizzas.map((pizza) => (
        <Link
          href={`/product/${pizza.id}`}
          key={pizza.id}
          className="w-full h-[60vh] p-4 border-r-2 border-b-2 border-red-500 group even:bg-fuchsia-50 sm:w-1/2 lg:w-1/3 flex flex-col justify-between"
        >
          {/* Image Container */}
          {pizza.img && (
            <div className="relative h-[80%]">
              <Image
                src={pizza.img}
                alt={pizza.title}
                fill
                className="object-contain"
              />
            </div>
          )}
          {/* Text Container */}
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-xl xl:text-2xl">{pizza.title}</h1>
            <h2 className="group-hover:hidden text-xl">Rs. {pizza.price}</h2>
            <button className="hidden group-hover:block bg-red-500 text-white p-2 rounded-md">
              Add to cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Category;
