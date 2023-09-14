"use client";
import { useState, useEffect } from "react";

type Props = {
  price: number;
  id: number;
  options?: { title: string; additionalPrice: number }[];
};
const PriceChanger = ({ price, id, options }: Props) => {
  const [totalPrice, setTotalPrice] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(0);

  useEffect(() => {
    setTotalPrice(
      quantity *
        (options ? price + options[selectedOption].additionalPrice : price) // if options is not undefined, then add the additional price of the selected option
    ); //here qunatity is multiplied with the price of the product and the additional price of the selected option if options is not undefined
  }, [quantity, selectedOption, price, options]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-2xl">Rs. {totalPrice.toFixed(2)}</h2>
      {/* Options Container */}
      <div className="flex gap-4">
        {options?.map((option, index) => (
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
        <button className="bg-red-500 w-56 text-white p-3 ring-1 ring-red-500">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default PriceChanger;
