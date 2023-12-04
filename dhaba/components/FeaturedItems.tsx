import { ProductType } from "@/types/type";
import Image from "next/image";

const getData = async () => {
  try {
    const res = await fetch(
      `${
        process.env.Next_PUBLIC_URL && process.env.Next_PUBLIC_URL
      }/api/products`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
const FeaturedItems = async () => {
  const featuredProducts: ProductType[] = await getData(); // here ProductType[] is used for multiple products and ProductType is used for single product
  return (
    <div className="w-screen overflow-x-scroll scroll-smooth text-red-500">
      {/* Wrapper */}
      <div className="w-max flex">
        {/* Single Item */}
        {featuredProducts &&
          featuredProducts.map((product) => (
            <div key={product.id}>
              <div className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]">
                {/* Image Container */}
                {product.img && (
                  <div className="relative flex-1 w-full hover:rotate-[5deg] transition-all duration-500">
                    <Image
                      src={product.img}
                      alt={product.title}
                      className="object-contain lg:object-cover rounded-md"
                      fill
                    />
                  </div>
                )}
                {/* Text Container */}
                <div className="flex-1 flex flex-col gap-4 items-center justify-center text-center">
                  <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">
                    {product.title}
                  </h1>
                  <p className="p-4 2xl:p-8">{product.description}</p>
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
