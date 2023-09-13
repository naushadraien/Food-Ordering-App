import Image from "next/image";
import { featuredProducts } from "@/data";

const FeaturedItems = () => {
  return (
    <div className="w-screen overflow-x-scroll text-red-500 hover:bg-fuchsia-50 transition-all duration-300">
      {/* Wrapper */}
      <div className="w-max flex">
        {/* Single Item */}
        {featuredProducts.map((product) => (
          <div key={product.id}>
            <div className="w-screen h-[60vh] flex flex-col items-center justify-around p-4">
              {/* Image Container */}
              {product.img && (
                <div className="relative flex-1 w-full hover:rotate-[60deg] transition-all duration-500">
                  <Image
                    src={product.img}
                    alt={product.title}
                    className="object-contain"
                    fill
                  />
                </div>
              )}
              {/* Text Container */}
              <div className="flex-1 flex flex-col gap-4 items-center text-center">
                <h1 className="text-xl font-bold uppercase">{product.title}</h1>
                <p className="p-4">{product.desc}</p>
                <span className="text-xl font-bold">Rs. {product.price}</span>
                <button className="bg-red-500 text-white p-2 rounded-md">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedItems;
