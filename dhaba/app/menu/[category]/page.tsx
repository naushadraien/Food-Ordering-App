import { ProductType } from "@/types/type";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: {
    category: string;
  };
};

const getData = async (category: string) => {
  try {
    const res = await fetch(
      `${
        process.env.Next_PUBLIC_URL && process.env.Next_PUBLIC_URL
      }/api/products?cat=${category}`,
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
const Category = async ({ params }: Props) => {
  const products: ProductType[] = await getData(params.category);
  return (
    <div className="flex flex-wrap text-red-500">
      {products &&
        products.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="w-full h-[60vh] p-4 border-r-2 border-b-2 border-red-500 group even:bg-fuchsia-50 sm:w-1/2 lg:w-1/3 flex flex-col justify-between"
          >
            {/* Image Container */}
            {product.img && (
              <div className="relative h-[80%]">
                <Image
                  src={product.img}
                  alt={product.title}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            {/* Text Container */}
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-xl xl:text-2xl">{product.title}</h1>
              <h2 className="group-hover:hidden text-xl">
                Rs. {product.price}
              </h2>
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
