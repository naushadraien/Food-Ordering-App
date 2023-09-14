import PriceChanger from "@/components/PriceChanger";
import { singleProduct } from "@/data";
import Image from "next/image";

const SingleProduct = () => {
  return (
    <div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8  md:items-center">
      {/* Image Container */}
      {singleProduct.img && (
        <div className="relative w-full h-1/2 md:h-[70%]">
          <Image
            src={singleProduct.img}
            alt=""
            className="object-contain"
            fill
          />
        </div>
      )}
      {/* Text Container */}
      <div className=" h-1/2 flex flex-col gap-1 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="font-bold text-3xl xl:text-4xl">{singleProduct.title}</h1>
        <p>{singleProduct.desc}</p>
        <PriceChanger
          price={singleProduct.price}
          id={singleProduct.id}
          options={singleProduct.options}
        />
      </div>
    </div>
  );
};

export default SingleProduct;
