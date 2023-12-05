"use client";
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CartPage = () => {
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();
  // console.log(totalPrice);

  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    //this is used to rehydrate the cart when the page is refreshed and we use this wherever we use useCartStore
    useCartStore.persist.rehydrate();
  }, []);

  const handleCheckout = async () => {
    if (!session) {
      return router.push("/login");
    } else {
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price: totalPrice,
            products,
            status: "Not Paid!",
            userEmail: session.user.email,
          }),
        });
        const data = await res.json();
        // console.log(data.id);
        router.push(`/payment/${data.id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // console.log(totalPrice);

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
      {/* Product Container */}
      <div className="h-2/3 p-4 lg:px-20 xl:p-40 flex flex-col justify-between overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2">
        {/* Single Item Container */}
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between mb-4"
          >
            {product.img && (
              <Image
                src={product.img}
                alt={product.title}
                width={100}
                height={100}
              />
            )}
            <div>
              <h1 className="text-xl font-bold">
                {product.title} x{product.quantity}
              </h1>
              <span>{product.optionTitle}</span>
            </div>
            <h2 className="font-bold">Rs. {product.price}</h2>
            <span
              className="cursor-pointer"
              onClick={() => removeFromCart(product)}
            >
              X
            </span>
          </div>
        ))}
      </div>
      {/* Payment Container */}
      <div className="h-1/2 p-4 lg:px-20 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span>Subtotal ({totalItems} items)</span>
          <span>Rs. {`${products.length ? totalPrice.toFixed(0) : 0}`}</span>
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
          <span className="font-bold">
            Rs. {`${products.length ? totalPrice.toFixed(0) : 0}`}
          </span>
        </div>
        <button
          className="bg-red-500 text-white p-3 rounded-md w-1/2 self-end"
          onClick={handleCheckout}
        >
          CheckOut
        </button>
      </div>
    </div>
  );
};

export default CartPage;
