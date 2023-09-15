import Image from "next/image";

const CartPage = () => {
  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
      {/* Product Container */}
      <div className="h-2/3 p-4 lg:px-20 xl:p-40 flex flex-col justify-between overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2">
        {/* Single Item Container */}
        <div className="flex items-center justify-between mb-4">
          <Image
            src="/temporary/p1.png"
            alt="First-Product"
            width={100}
            height={100}
          />
          <div>
            <h1 className="text-xl font-bold">Sicilian</h1>
            <span>Large</span>
          </div>
          <h2 className="font-bold">Rs. {"88.90"}</h2>
          <span className="cursor-pointer">X</span>
        </div>
        {/* Single Item Container */}
        <div className="flex items-center justify-between mb-4">
          <Image
            src="/temporary/p1.png"
            alt="First-Product"
            width={100}
            height={100}
          />
          <div>
            <h1 className="text-xl font-bold">Sicilian</h1>
            <span>Large</span>
          </div>
          <h2 className="font-bold">Rs. {"88.90"}</h2>
          <span className="cursor-pointer">X</span>
        </div>
        {/* Single Item Container */}
        <div className="flex items-center justify-between mb-4">
          <Image
            src="/temporary/p1.png"
            alt="First-Product"
            width={100}
            height={100}
          />
          <div>
            <h1 className="text-xl font-bold">Sicilian</h1>
            <span>Large</span>
          </div>
          <h2 className="font-bold">Rs. {"88.90"}</h2>
          <span className="cursor-pointer">X</span>
        </div>
      </div>
      {/* Payment Container */}
      <div className="h-1/2 p-4 lg:px-20 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span>Subtotal{"(3 items)"}</span>
          <span>Rs. 82.90</span>
        </div>
        <div className="flex justify-between">
          <span>Service Cost</span>
          <span>Rs. {"0"}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Cost</span>
          <span className="text-green-600">Free!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span>Total(Incl. VAT)</span>
          <span className="font-bold">Rs. 82.90</span>
        </div>
        <button className="bg-red-500 text-white p-3 rounded-md w-1/2 self-end">
          CheckOut
        </button>
      </div>
    </div>
  );
};

export default CartPage;
