"use client"
import { useCartStore } from "@/utils/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const CartIcon = () => {
  const {totalItems} = useCartStore();
  useEffect(() => { //this is used to rehydrate the cart when the page is refreshed and we use this wherever we use useCartStore
    useCartStore.persist.rehydrate()
  }, []);
  return (
    <Link href="/cart" className="flex items-center gap-4">
      <div className="relative w-8 h-8 md:w-5 md:h-5 ">
        <Image src="/cart.png" alt="cart-icon" fill />
      </div>
      <span>Cart ({totalItems})</span>
    </Link>
  );
};

export default CartIcon;
