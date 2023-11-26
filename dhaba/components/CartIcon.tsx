"use client";
import { useCartStore } from "@/utils/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { BsCart } from "react-icons/bs";

const CartIcon = () => {
  const { totalItems } = useCartStore();
  useEffect(() => {
    //this is used to rehydrate the cart when the page is refreshed and we use this wherever we use useCartStore
    useCartStore.persist.rehydrate();
  }, []);
  return (
    <Link href="/cart" className="flex items-center gap-4">
      <div className="relative w-8 h-8 md:w-5 md:h-5 text-red-500 ">
        <BsCart size={20} />
        <Image src="/cart.png" alt="cart-icon" className="block md:hidden" fill />
      </div>
      <span>Cart ({totalItems})</span>
    </Link>
  );
};

export default CartIcon;
