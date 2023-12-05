import DeleteBtn from "@/components/DeleteBtn";
import PriceChanger from "@/components/PriceChanger";
import { ProductType } from "@/types/type";
import Image from "next/image";

const getData = async (id: string) => {
  try {
    const res = await fetch(
      `${
        process.env.Next_PUBLIC_URL && process.env.Next_PUBLIC_URL
      }/api/products/${id}`,
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
const SingleProduct = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const singleProduct: ProductType = await getData(id);
  return (
    <div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 mb-10  md:items-center relative">
      {/* Image Container */}
      {singleProduct && singleProduct.img && (
        <div className="relative w-full h-1/2 md:h-[70%]">
          <Image
            src={singleProduct.img}
            alt={singleProduct.title}
            className="object-contain"
            fill
          />
        </div>
      )}
      {/* Text Container */}
      <div className=" h-1/2 flex flex-col gap-1 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="font-bold text-3xl xl:text-4xl">
          {singleProduct.title}
        </h1>
        <p>{singleProduct.description}</p>
        <PriceChanger product={singleProduct} />
      </div>
      <DeleteBtn id={singleProduct.id} />
    </div>
  );
};

export default SingleProduct;
