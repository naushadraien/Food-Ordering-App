"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const Slider = () => {
  const [currentSlider, setCurrentSlider] = useState(0);

  const data = [
    {
      id: 1,
      title: "Satisfy Your Cravings!",
      image: "/slide1.jpg",
    },
    {
      id: 2,
      title: "Delicious Delivered to Your Door.",
      image: "/slide2.webp",
    },
    {
      id: 3,
      title: "Taste the World, One Bite at a Time.",
      image: "/slide3.jpg",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // setCurrentSlider((prev) => {
      //   if (prev === data.length - 1) {
      //     // here if prev is 2 then it will return 0 and here 2 is the maximum index of the data array
      //     return 0;
      //   }
      //   return prev + 1;
      // });

      //another method for slider for minimize the code
      setCurrentSlider((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(interval); //this is for clear the interval
  }, [data.length]);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-50">
      <div className="flex flex-1 justify-center items-center flex-col gap-8 font-bold text-red-500 py-6">
        <h1 className="text-5xl text-center uppercase p-4 md:text-6xl xl:text-7xl">
          {data[currentSlider].title}
        </h1>
        <button className="bg-red-500 text-white py-4 px-8 rounded-md">
          Order Now!
        </button>
      </div>
      <div className="w-full flex-1 relative">
        <Image
          src={data[currentSlider].image}
          alt="sildes"
          className="object-cover"
          fill
        />
      </div>
    </div>
  );
};

export default Slider;
