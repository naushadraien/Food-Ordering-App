import Image from "next/image";
import CounterClock from "./CounterClock";
import Link from "next/link";

const OfferTimer = () => {
  return (
    <div className="bg-black h-screen flex flex-col md:flex-row md:justify-between md:bg-[url('/offerBg.png')] md:h-[70vh]">
      {/* Text container */}
      <div className="flex-1 flex items-center flex-col justify-center gap-8 text-center p-6">
        <h1 className="text-5xl font-bold text-white xl:text-6xl">
          <span className="text-red-500">Cheeseburger</span> with French Fry
        </h1>
        <p className="text-white xl:text-xl">
          For the ultimate indulgence, Cheeseburger with French Fry is a double
          dose of delight. Two beef patties are sandwiched between slices of
          crispy bacon, cheddar cheese, lettuce, tomatoes, and a special sauce,
          all in a fluffy bun.
        </p>
        <CounterClock />
        <Link href="/menu">
          <button className="bg-red-500 text-white px-6 py-3 rounded-md">
            Order Now!
          </button>
        </Link>
      </div>
      {/* Image container */}
      <div className="relative flex-1 w-full md:h-full">
        <Image
          src="/offerProduct.png"
          alt="offer-product"
          className="object-contain"
          fill
        />
      </div>
    </div>
  );
};

export default OfferTimer;
