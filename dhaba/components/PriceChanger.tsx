"use client";
import { ProductType } from "@/types/type";
import { useCartStore } from "@/utils/store";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const PriceChanger = ({ product }: {product: ProductType}) => {

  const {addToCart} = useCartStore();

  const [totalPrice, setTotalPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(0);

  useEffect(() => { //this is used to rehydrate the cart when the page is refreshed and we use this wherever we use useCartStore
    useCartStore.persist.rehydrate()
  }, []);

  useEffect(() => {
    setTotalPrice(
      quantity *
        (product.options?.length ? product.price + product.options[selectedOption].additionalPrice : product.price) // if options is not undefined, then add the additional price of the selected option
    ); //here qunatity is multiplied with the price of the product and the additional price of the selected option if options is not undefined
  }, [quantity, selectedOption,product]);

  const handleAddtoCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      img: product.img,
      price: totalPrice,
      ...(product.options?.length && {optionTitle: product.options[selectedOption].title}),
      quantity: quantity,
  });
  toast.success("Product Added to Cart!");
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-2xl">Rs. {totalPrice}</h2>
      {/* Options Container */}
      <div className="flex gap-4">
        {product.options?.length && product.options?.map((option, index) => (
          <button
            key={index}
            className={`min-w-[6rem] p-2 ring-1 ring-red-400 rounded-md ${
              selectedOption === index
                ? "bg-red-400 text-white"
                : "bg-white text-red-400"
            }`}
            onClick={() => setSelectedOption(index)}
          >
            {option.title}
          </button>
        ))}
      </div>
      {/* Quantity and Add to Cart Button */}
      <div className="flex justify-between items-center">
        {/* Quantity */}
        <div className=" flex justify-between w-full p-3 ring-1 ring-red-500">
          <span>Quantity</span>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            >
              {">"}
            </button>
          </div>
        </div>
        {/* Add to Cart Button */}
        <button className="bg-red-500 w-56 text-white p-3 ring-1 ring-red-500" onClick={handleAddtoCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default PriceChanger;
